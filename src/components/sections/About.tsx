import { FC, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutContent } from '../../types/content';

gsap.registerPlugin(ScrollTrigger);

interface AboutProps {
  content: AboutContent;
}

export const About: FC<AboutProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0.3, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      }

      cardsRef.current
        .filter(Boolean)
        .forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
                scrub: true,
              },
            }
          );
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <section ref={sectionRef} id="about" className="py-16 bg-dark-secondary">
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-semibold text-center text-white mb-10"
        >
          {content.title}
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {content.cards.map((card, index) => (
            <div
              key={card.id}
              ref={setCardRef(index)}
              className="rounded-xl border border-white/10 bg-white/5 p-6 text-left"
            >
              <div className="text-3xl mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{card.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};