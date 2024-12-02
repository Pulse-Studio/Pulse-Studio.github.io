import { FC } from 'react';
import { AboutContent } from '../../types/content';

interface AboutProps {
  content: AboutContent;
}

export const About: FC<AboutProps> = ({ content }) => {
  return (
    <section id="about" className="py-20 bg-dark-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          {content.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {content.cards.map((card) => (
            <div
              key={card.id}
              className="card-gradient p-6 rounded-lg hover-glow"
              data-aos="fade-up"
              data-aos-delay={(content.cards.indexOf(card) * 100).toString()}
            >
              <h3 className="text-2xl font-bold mb-4 text-red-400">
                {card.icon} {card.title}
              </h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};