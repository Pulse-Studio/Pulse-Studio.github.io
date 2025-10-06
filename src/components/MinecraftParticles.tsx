import { FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface MinecraftParticlesProps {
  count?: number;
}

export const MinecraftParticles: FC<MinecraftParticlesProps> = ({ count = 50 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLDivElement[] = [];

    // Создаем частицы
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
  particle.className = 'absolute w-2 h-2 bg-white/60 opacity-60';
      particle.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'; // Квадратная форма
      
      // Случайные начальные позиции
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      
      gsap.set(particle, {
        x,
        y,
        scale: Math.random() * 0.5 + 0.5,
        rotation: Math.random() * 360
      });

      container.appendChild(particle);
      particles.push(particle);
      particlesRef.current.push(particle);
    }

    // Анимация частиц
    particles.forEach((particle, index) => {
      // Плавающее движение
      gsap.to(particle, {
        y: `+=${Math.random() * 100 + 50}`,
        x: `+=${Math.random() * 60 - 30}`,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });

      // Мерцание
      gsap.to(particle, {
        opacity: Math.random() * 0.8 + 0.2,
        duration: Math.random() * 2 + 1,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: Math.random() * 2
      });

      // Вращение
      gsap.to(particle, {
        rotation: "+=360",
        duration: Math.random() * 10 + 5,
        repeat: -1,
        ease: "none"
      });
    });

    // Интерактивность с мышью
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      particles.forEach((particle) => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(clientX - particleX, 2) + Math.pow(clientY - particleY, 2)
        );
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          const angle = Math.atan2(particleY - clientY, particleX - clientX);
          
          gsap.to(particle, {
            x: `+=${Math.cos(angle) * force * 20}`,
            y: `+=${Math.sin(angle) * force * 20}`,
            scale: 1 + force * 0.5,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [count]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  );
};