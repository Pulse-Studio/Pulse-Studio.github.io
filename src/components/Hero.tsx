import { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeroContent } from '../types/content';
import { MinecraftScene } from './MinecraftScene';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  content: HeroContent;
}

export const Hero: FC<HeroProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      if (!container) return;

      gsap.to(container, {
        yPercent: -8,
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        },
        defaults: { ease: 'none' },
      });

      if (titleRef.current) {
        textTimeline.fromTo(
          titleRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0.4, y: -24 }
        );
      }

      if (subtitleRef.current) {
        textTimeline.fromTo(
          subtitleRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0.3, y: -20 },
          0
        );
      }

      if (ctaRef.current) {
        textTimeline.fromTo(
          ctaRef.current,
          { opacity: 1, y: 0 },
          { opacity: 0.2, y: -16 },
          0
        );
      }

      if (hintRef.current) {
        textTimeline.fromTo(
          hintRef.current,
          { opacity: 1 },
          { opacity: 0, y: -10 },
          0
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const displayText = content.texts[content.texts.length - 1] ?? content.texts[0];

  return (
    <section className="h-screen flex items-center justify-center text-center relative overflow-hidden bg-dark-bg">
      {/* ThreeJS интерактивная сцена с кубиками */}
      <MinecraftScene />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Основной контент */}
      <div ref={containerRef} className="relative z-20 px-6 py-10 bg-black/35 backdrop-blur rounded-2xl mx-4 max-w-3xl">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-semibold mb-6 text-white"
          dangerouslySetInnerHTML={{ __html: displayText }}
        />

        <p ref={subtitleRef} className="text-lg text-gray-200 mb-8">
          {content.subtitle}
        </p>

        <div className="flex justify-center">
          <Link
            ref={ctaRef}
            to={content.ctaButton.link}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900/80 text-white border border-white/20 rounded-full transition-colors duration-300 hover:bg-gray-800"
          >
            {content.ctaButton.text}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;