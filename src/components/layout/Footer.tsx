import { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FooterContent } from '../../types/footer';
import { Github, Mail, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  content: FooterContent;
}

const Footer: FC<FooterProps> = ({ content }) => {
  const currentYear = new Date().getFullYear();
  const copyrightText = content.copyrightText.replace('2024', currentYear.toString());
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Анимация появления футера
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          end: 'top 70%',
          scrub: 1,
        },
      });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
        .fromTo(
          linksRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          '-=0.3'
        )
        .fromTo(
          [socialsRef.current, emailRef.current],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          '-=0.3'
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const getSocialIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'discord':
        return <MessageCircle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <footer ref={footerRef} className="relative bg-black/80 backdrop-blur-sm border-t border-white/5 py-16 mt-auto overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 via-transparent to-transparent pointer-events-none gradient-overlay" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-px h-16 bg-gradient-to-b from-cyan-500/20 to-transparent decorative-line" />
      <div className="absolute top-0 right-1/4 w-px h-16 bg-gradient-to-b from-cyan-500/20 to-transparent decorative-line" style={{ animationDelay: '1.5s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div ref={logoRef} className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.png" 
                alt="Pulse Studio Logo" 
                className="w-10 h-10 object-contain brand-icon"
              />
              <span className="text-xl font-bold text-white">Pulse Studio</span>
            </div>
            <p className="text-gray-400 text-sm max-w-xs text-center md:text-left">
              Создаём интерактивные миры с экспериментальным подходом к геймдизайну
            </p>
          </div>

          {/* Quick Links */}
          <div ref={linksRef} className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Навигация</h3>
            <nav className="flex flex-col gap-3">
              <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                О студии
              </a>
              <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                Проекты
              </a>
              <a href="#team" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                Команда
              </a>
              <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-sm">
                Контакты
              </a>
            </nav>
          </div>

          {/* Contact & Socials */}
          <div className="flex flex-col items-center md:items-start gap-6">
            {/* Email */}
            {content.email && (
              <div ref={emailRef} className="flex flex-col items-center md:items-start">
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Связь</h3>
                <a
                  href={`mailto:${content.email}`}
                  className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                >
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">{content.email}</span>
                </a>
              </div>
            )}

            {/* Social Links */}
            {content.socials && content.socials.length > 0 && (
              <div ref={socialsRef} className="flex flex-col items-center md:items-start">
                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Соцсети</h3>
                <div className="flex gap-3">
                  {content.socials.map((social) => (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center 
                               text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/20 
                               transition-all duration-300 hover:scale-110 transform"
                      aria-label={social.label}
                    >
                      {getSocialIcon(social.icon)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8 animated-divider" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm copyright-text">
          <p className="text-gray-500">{copyrightText}</p>

          {/* Legal Links */}
          {content.links && content.links.length > 0 && (
            <div className="flex gap-6">
              {content.links.map((link) => (
                <Link
                  key={link.id}
                  to={link.url}
                  className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Made with love indicator */}
        {/* <div className="mt-8 text-center">
          <p className="text-gray-600 text-xs flex items-center justify-center gap-2">
            Сделано с 
            <span className="text-cyan-500 animate-pulse">♦</span>
            в России
          </p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
