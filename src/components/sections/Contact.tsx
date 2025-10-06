import { FC } from 'react';
import { ContactContent } from '../../types/content';

interface ContactProps {
  content: ContactContent;
}

export const Contact: FC<ContactProps> = ({ content }) => {
  return (
    <section id="contact" className="py-20 bg-dark-custom">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12 text-white" data-aos="fade-up">
          {content.title}
        </h2>
        {content.socials.length > 0 && (
          <div
            className="flex justify-center space-x-8 mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {content.socials.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition duration-300"
              >
                <i className={social.icon}></i>
              </a>
            ))}
          </div>
        )}
        <p className="text-gray-400">{content.email}</p>
      </div>
    </section>
  );
};
