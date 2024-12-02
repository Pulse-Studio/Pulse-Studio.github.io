import { FC } from 'react';
import { Link } from 'react-router-dom';
import { FooterContent } from '../../types/footer';
import { Icons } from 'lucide-react';

interface FooterProps {
  content: FooterContent;
}

const Footer: FC<FooterProps> = ({ content }) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = content.copyrightText.replace('2024', currentYear.toString());

  return (
    <footer className="bg-dark-custom py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Links */}
          {content.socials && content.socials.length > 0 && (
            <div className="flex space-x-6">
              {content.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-400 transition duration-300"
                  aria-label={social.label}
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                  >
                    <use href={`/icons/sprite.svg#${social.icon}`} />
                  </svg>
                </a>
              ))}
            </div>
          )}

          {/* Links */}
          {content.links && content.links.length > 0 && (
            <div className="flex space-x-6">
              {content.links.map((link) => (
                <Link
                  key={link.id}
                  to={link.url}
                  className="text-gray-400 hover:text-red-400 transition duration-300"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}

          {/* Email */}
          {content.email && (
            <a
              href={`mailto:${content.email}`}
              className="text-gray-400 hover:text-red-400 transition duration-300"
            >
              {content.email}
            </a>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          {copyrightText}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
