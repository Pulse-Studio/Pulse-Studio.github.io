import { FC, useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

export const RevealCard: FC<RevealCardProps> = ({ children, index, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Эффект "строительства" карточки
    gsap.fromTo(
      card,
      {
        opacity: 0,
        scale: 0.8,
        rotateY: -15,
        y: 60,
      },
      {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        y: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'top 65%',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === card) {
          trigger.kill();
        }
      });
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className={className}
      style={{ perspective: '1000px' }}
    >
      {children}
    </div>
  );
};
