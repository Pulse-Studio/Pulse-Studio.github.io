import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface AnnihilationHeaderProps {
  language: 'ru' | 'en';
  onLanguageChange: (lang: 'ru' | 'en') => void;
}

export const AnnihilationHeader: FC<AnnihilationHeaderProps> = ({
  language,
  onLanguageChange,
}) => {
  const location = useLocation();
  
  const navItems = [
    { id: 'home', path: '/projects/annihilation', label: { ru: 'Главная', en: 'Home' } },
    { id: 'news', path: '/projects/annihilation/news', label: { ru: 'Новости', en: 'News' } },
    { id: 'changelog', path: '/projects/annihilation/changelog', label: { ru: 'История обновлений', en: 'Changelog' } },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="annihilation-page fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors"
          >
            <img src="/logo.png" alt="Pulse Studio" className="w-8 h-8" />
            <span className="font-bold text-lg">Annihilation</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`text-sm font-medium transition-colors relative ${
                  isActive(item.path)
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label[language]}
                {isActive(item.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cyan-400" />
                )}
              </Link>
            ))}
          </nav>

          {/* Language Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLanguageChange('ru')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                language === 'ru'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                language === 'en'
                  ? 'bg-cyan-500 text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              EN
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
