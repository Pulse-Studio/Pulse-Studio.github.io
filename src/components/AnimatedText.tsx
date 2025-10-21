import { FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p';
  className?: string;
  delay?: number;
}

export const AnimatedText: FC<AnimatedTextProps> = ({
  text,
  tag: Tag = 'p',
  className = '',
  delay = 0,
}) => {
  const textRef = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Разбиваем текст на слова для анимации
    const words = text.split(' ');
    element.innerHTML = words
      .map((word) => `<span class="inline-block opacity-0">${word}&nbsp;</span>`)
      .join('');

    const wordElements = element.querySelectorAll('span');

    // Анимация появления слов
    gsap.to(wordElements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.05,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 60%',
        scrub: 1,
        toggleActions: 'play none none reverse',
      },
    });

    // Устанавливаем начальное состояние
    gsap.set(wordElements, { y: 20 });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [text, delay]);

  return <Tag ref={textRef as any} className={className} />;
};
