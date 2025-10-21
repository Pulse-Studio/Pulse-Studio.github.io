import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Enhanced3DSceneProps {
  className?: string;
}

export const Enhanced3DScene: FC<Enhanced3DSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const cubesGroupRef = useRef<THREE.Group>();
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    // Инициализация сцены
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    mountRef.current.appendChild(renderer.domElement);

    // Позиция камеры
    camera.position.set(0, 3, 10);
    camera.lookAt(0, 0, 0);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0x4040ff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0x00ffff, 1, 20);
    pointLight1.position.set(-5, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff00ff, 1, 20);
    pointLight2.position.set(5, 3, -3);
    scene.add(pointLight2);

    // Создание группы кубов
    const cubesGroup = new THREE.Group();
    cubesGroupRef.current = cubesGroup;
    scene.add(cubesGroup);

    // Геометрия и материалы для разных типов кубов
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const edgesGeometry = new THREE.EdgesGeometry(geometry);

    const materials = [
      new THREE.MeshStandardMaterial({
        color: 0x00ffff,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x004444,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xff00ff,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x440044,
      }),
      new THREE.MeshStandardMaterial({
        color: 0xffff00,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x444400,
      }),
    ];

    // Создаём структурированную композицию кубов
    const gridSize = 5;
    const spacing = 2;
    const cubes: THREE.Mesh[] = [];

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        for (let z = 0; z < gridSize; z++) {
          // Создаём не все кубы, а интересный паттерн
          if ((x + y + z) % 2 === 0 || (x === 2 && y === 2 && z === 2)) {
            const material = materials[(x + y + z) % materials.length].clone();
            const cube = new THREE.Mesh(geometry, material);

            // Начальная позиция (сжато в центр)
            cube.position.set(0, 0, 0);

            // Сохраняем целевую позицию в userData
            cube.userData.targetPosition = new THREE.Vector3(
              (x - gridSize / 2) * spacing,
              (y - gridSize / 2) * spacing,
              (z - gridSize / 2) * spacing
            );

            // Случайная ротация
            cube.rotation.set(
              Math.random() * Math.PI,
              Math.random() * Math.PI,
              Math.random() * Math.PI
            );

            cube.castShadow = true;
            cube.receiveShadow = true;

            // Добавляем edges для pixelated эффекта
            const edges = new THREE.LineSegments(
              edgesGeometry,
              new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
            );
            cube.add(edges);

            cubesGroup.add(cube);
            cubes.push(cube);
          }
        }
      }
    }

    // Анимация появления кубов на скролле
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: mountRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: false,
      },
    });

    // Раскрытие структуры
    cubes.forEach((cube, index) => {
      const target = cube.userData.targetPosition;
      const delay = index * 0.01;

      timeline.to(
        cube.position,
        {
          x: target.x,
          y: target.y,
          z: target.z,
          duration: 1,
          ease: 'power2.out',
        },
        delay
      );

      timeline.to(
        cube.rotation,
        {
          x: target.x * 0.2,
          y: target.y * 0.2,
          z: target.z * 0.2,
          duration: 1,
          ease: 'power2.inOut',
        },
        delay
      );
    });

    // Вращение всей группы
    timeline.to(
      cubesGroup.rotation,
      {
        y: Math.PI * 2,
        duration: 2,
        ease: 'none',
      },
      0
    );

    // Движение камеры
    timeline.to(
      camera.position,
      {
        z: 15,
        y: 5,
        duration: 2,
        ease: 'power1.inOut',
      },
      0
    );

    // Анимация освещения
    timeline.to(
      pointLight1.position,
      {
        x: -8,
        y: 5,
        duration: 2,
        ease: 'sine.inOut',
      },
      0
    );

    timeline.to(
      pointLight2.position,
      {
        x: 8,
        y: 5,
        duration: 2,
        ease: 'sine.inOut',
      },
      0
    );

    // Цикл рендера
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      // Небольшое движение кубов
      cubes.forEach((cube, index) => {
        const time = Date.now() * 0.0005;
        cube.position.y += Math.sin(time + index) * 0.001;
      });

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Обработка изменения размера окна
    const handleResize = () => {
      if (!camera || !renderer) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Очистка
    return () => {
      window.removeEventListener('resize', handleResize);

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((mat) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`fixed top-0 left-0 w-full h-screen pointer-events-none z-0 ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
