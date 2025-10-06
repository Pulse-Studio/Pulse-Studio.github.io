import { FC, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface MinecraftSceneProps {
  className?: string;
}

interface CubeData {
  mesh: THREE.Mesh;
  originalPosition: THREE.Vector3;
  targetPosition: THREE.Vector3;
  isAnimating: boolean;
  activeTimeline?: gsap.core.Timeline;
}

export const MinecraftScene: FC<MinecraftSceneProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const cubesRef = useRef<CubeData[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();
  const [isExploded, setIsExploded] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Инициализация сцены
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      premultipliedAlpha: false 
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Сохраняем ссылки
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    mountRef.current.appendChild(renderer.domElement);

    // Настройка камеры
    camera.position.set(0, 0, 15);
    camera.lookAt(0, 0, 0);

    // Освещение
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xf1f5f9, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Создание материалов в стиле Minecraft
    const materials = [
      new THREE.MeshLambertMaterial({ color: 0x94a3b8 }), // светлый сланец
      new THREE.MeshLambertMaterial({ color: 0x64748b }), // темный сланец
      new THREE.MeshLambertMaterial({ color: 0xfacc15 }), // мягкий акцент
      new THREE.MeshLambertMaterial({ color: 0x9ca3af }), // нейтральный блок
    ];

    // Создание структуры кубиков (домик)
    const cubePositions = [
      // Основание
      { x: -1, y: -1, z: 0 }, { x: 0, y: -1, z: 0 }, { x: 1, y: -1, z: 0 },
      { x: -1, y: -1, z: 1 }, { x: 0, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
      { x: -1, y: -1, z: 2 }, { x: 0, y: -1, z: 2 }, { x: 1, y: -1, z: 2 },
      
      // Стены
      { x: -1, y: 0, z: 0 }, { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 2 }, { x: 1, y: 0, z: 2 },
      { x: -1, y: 1, z: 0 }, { x: 1, y: 1, z: 0 },
      { x: -1, y: 1, z: 2 }, { x: 1, y: 1, z: 2 },
      
      // Крыша
      { x: -1, y: 2, z: 0 }, { x: 0, y: 2, z: 0 }, { x: 1, y: 2, z: 0 },
      { x: -1, y: 2, z: 1 }, { x: 0, y: 2, z: 1 }, { x: 1, y: 2, z: 1 },
      { x: -1, y: 2, z: 2 }, { x: 0, y: 2, z: 2 }, { x: 1, y: 2, z: 2 },
      
      // Декоративные элементы
      { x: 0, y: 3, z: 1 }, // Вершина
    ];

    // Создание кубиков
    cubePositions.forEach((pos, index) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = materials[index % materials.length].clone();
      const cube = new THREE.Mesh(geometry, material);
      
      // Начальная позиция (разбросанные кубики)
      const startX = (Math.random() - 0.5) * 20;
      const startY = (Math.random() - 0.5) * 20;
      const startZ = (Math.random() - 0.5) * 20;
      
      cube.position.set(startX, startY, startZ);
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      cube.castShadow = true;
      cube.receiveShadow = true;
      
      scene.add(cube);

      const cubeData: CubeData = {
        mesh: cube,
        originalPosition: new THREE.Vector3(startX, startY, startZ),
        targetPosition: new THREE.Vector3(pos.x, pos.y, pos.z),
        isAnimating: false
      };

      cubesRef.current.push(cubeData);
    });

    // Анимация сборки структуры
    const animateAssembly = () => {
      cubesRef.current.forEach((cubeData, index) => {
        cubeData.activeTimeline?.kill();

        const tl = gsap.timeline({
          defaults: { ease: 'power3.inOut', overwrite: 'auto' },
          delay: index * 0.08,
          onStart: () => {
            cubeData.isAnimating = true;
          },
          onComplete: () => {
            cubeData.isAnimating = false;
            cubeData.activeTimeline = undefined;
          }
        });

        tl.to(cubeData.mesh.position, {
          x: cubeData.targetPosition.x,
          y: cubeData.targetPosition.y,
          z: cubeData.targetPosition.z,
          duration: 1.4
        })
          .to(
            cubeData.mesh.rotation,
            {
              x: 0,
              y: 0,
              z: 0,
              duration: 1.4
            },
            '<'
          );

        cubeData.activeTimeline = tl;
      });
    };

    // Запуск анимации сборки через небольшую задержку
    setTimeout(animateAssembly, 1000);

    // Обработка движения мыши
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Обработка кликов
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        cubesRef.current.map(cube => cube.mesh)
      );

      if (intersects.length > 0) {
        explodeStructure();
      }
    };

    // Функция взрыва структуры
    const explodeStructure = () => {
      if (isExploded) return;

      setIsExploded(true);

      cubesRef.current.forEach((cubeData, index) => {
        cubeData.activeTimeline?.kill();

        const direction = new THREE.Vector3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        ).normalize();

        const distance = Math.random() * 10 + 6;

        const tl = gsap.timeline({
          defaults: { ease: 'power3.inOut', overwrite: 'auto' },
          delay: index * 0.06,
          onStart: () => {
            cubeData.isAnimating = true;
          },
          onComplete: () => {
            cubeData.isAnimating = false;
            cubeData.activeTimeline = undefined;
          }
        });

        tl.to(cubeData.mesh.position, {
          x: cubeData.mesh.position.x + direction.x * distance,
          y: cubeData.mesh.position.y + direction.y * distance,
          z: cubeData.mesh.position.z + direction.z * distance,
          duration: 1.5
        })
          .to(
            cubeData.mesh.rotation,
            {
              x: cubeData.mesh.rotation.x + Math.random() * Math.PI * 2,
              y: cubeData.mesh.rotation.y + Math.random() * Math.PI * 2,
              z: cubeData.mesh.rotation.z + Math.random() * Math.PI * 2,
              duration: 1.5
            },
            '<'
          );

        cubeData.activeTimeline = tl;
      });

      gsap.delayedCall(2.8, () => {
        setIsExploded(false);
        animateAssembly();
      });
    };

    // Добавление обработчиков событий
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    // Обработка изменения размера окна
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Анимационный цикл
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      // Поворот камеры в зависимости от позиции мыши
      const targetRotationY = mouseRef.current.x * 0.3;
      const targetRotationX = mouseRef.current.y * 0.2;
      
      camera.position.x += (Math.sin(targetRotationY) * 15 - camera.position.x) * 0.05;
      camera.position.y += (targetRotationX * 5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Небольшое покачивание кубиков
      cubesRef.current.forEach((cubeData, index) => {
        if (!cubeData.isAnimating && !isExploded) {
          const time = Date.now() * 0.001;
          cubeData.mesh.position.y += Math.sin(time + index) * 0.01;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Очистка Three.js объектов
      cubesRef.current.forEach(cubeData => {
        cubeData.mesh.geometry.dispose();
        if (Array.isArray(cubeData.mesh.material)) {
          cubeData.mesh.material.forEach(material => material.dispose());
        } else {
          cubeData.mesh.material.dispose();
        }
      });
      
      renderer.dispose();
    };
  }, [isExploded]);

  return (
    <div 
      ref={mountRef} 
      className={`absolute inset-0 ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};