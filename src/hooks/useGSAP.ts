import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const useGSAP = () => {
  const contextRef = useRef<gsap.Context>();

  useEffect(() => {
    contextRef.current = gsap.context(() => {});
    return () => contextRef.current?.revert();
  }, []);

  return contextRef.current;
};

// Minecraft-themed animation presets
export const minecraftAnimations = {
  // Блочное появление элементов
  blockReveal: (element: string | Element, delay: number = 0) => {
    return gsap.fromTo(element, 
      {
        opacity: 0,
        scale: 0.8,
        rotationX: -90,
        transformOrigin: "center bottom"
      },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.8,
        delay,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  },

  // Пиксельное появление текста
  pixelText: (element: string | Element, delay: number = 0) => {
    return gsap.fromTo(element,
      {
        opacity: 0,
        y: 30,
        filter: "blur(5px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  },

  // Эффект падающих блоков
  fallingBlocks: (elements: string | NodeListOf<Element>) => {
    return gsap.fromTo(elements,
      {
        opacity: 0,
        y: -100,
        rotation: () => gsap.utils.random(-15, 15)
      },
      {
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1.2,
        ease: "bounce.out",
        stagger: {
          amount: 0.8,
          from: "random"
        },
        scrollTrigger: {
          trigger: elements,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  },

  // Параллакс эффект
  parallax: (element: string | Element, speed: number = 0.5) => {
    return gsap.to(element, {
      yPercent: -50 * speed,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  },

  // Пульсирующий эффект (как редстоун)
  redstoneGlow: (element: string | Element) => {
    return gsap.to(element, {
      boxShadow: "0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.4)",
      scale: 1.02,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: "power2.inOut"
    });
  },

  // Строительный эффект (блоки появляются постепенно)
  buildingEffect: (elements: string | NodeListOf<Element>) => {
    return gsap.fromTo(elements,
      {
        opacity: 0,
        scale: 0,
        transformOrigin: "bottom center"
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(2)",
        stagger: {
          amount: 1.2,
          grid: "auto",
          from: "start"
        },
        scrollTrigger: {
          trigger: elements,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }
};