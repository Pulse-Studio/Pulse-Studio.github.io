import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, Github } from 'lucide-react';
import { VoxelCanvasBackground } from '../components/VoxelCanvasBackground';
import { AnnihilationHeader } from '../components/AnnihilationHeader';
import { ScreenshotsGallery } from '../components/ScreenshotsGallery';
import { annihilationTranslations } from '../data/annihilationContent';
import '../styles/annihilation-fonts.css';

gsap.registerPlugin(ScrollTrigger);

interface Version {
  version: string;
  date: string;
  changelogUrl: { ru: string; en: string };
  whatsnewUrl: { ru: string; en: string };
  downloadUrl?: string;
}

const versions: Version[] = [
  {
    version: '0.16.0',
    date: 'October 21, 2025',
    changelogUrl: { ru: '/updates/changelog/0.16.0.ru.html', en: '/updates/changelog/0.16.0.html' },
    whatsnewUrl: { ru: '/updates/whatsnew/0.16.0.ru.html', en: '/updates/whatsnew/0.16.0.html' },
    downloadUrl: '/downloads/0.16.0.7z',
  },
  {
    version: '0.15.0',
    date: 'October 15, 2025',
    changelogUrl: { ru: '/updates/changelog/0.15.0.ru.html', en: '/updates/changelog/0.15.0.html' },
    whatsnewUrl: { ru: '/updates/whatsnew/0.15.0.ru.html', en: '/updates/whatsnew/0.15.0.html' },
    downloadUrl: '/downloads/0.15.0.7z',
  },
  {
    version: '0.14.4',
    date: 'October 10, 2025',
    changelogUrl: { ru: '/updates/changelog/0.14.4.ru.html', en: '/updates/changelog/0.14.4.html' },
    whatsnewUrl: { ru: '/updates/whatsnew/0.14.4.ru.html', en: '/updates/whatsnew/0.14.4.html' },
  },
  {
    version: '0.14.3',
    date: 'October 5, 2025',
    changelogUrl: { ru: '/updates/changelog/0.14.3.ru.html', en: '/updates/changelog/0.14.3.html' },
    whatsnewUrl: { ru: '/updates/whatsnew/0.14.3.ru.html', en: '/updates/whatsnew/0.14.3.html' },
  },
];

export const AnnihilationPage: FC = () => {
  const [language, setLanguage] = useState<'ru' | 'en'>(() => {
    const saved = localStorage.getItem('annihilation-language');
    return (saved === 'en' || saved === 'ru') ? saved : 'ru';
  });

  const t = annihilationTranslations[language];
  const currentVersion = versions[0];

  useEffect(() => {
    localStorage.setItem('annihilation-language', language);
  }, [language]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero анимация
      gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        ease: 'power2.out',
      });

      gsap.from('.hero-actions', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.9,
        ease: 'power2.out',
      });

      // Секции с scroll trigger
      gsap.utils.toArray('.fade-in-section').forEach((section: any) => {
        gsap.from(section, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 1,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="annihilation-page">
      <Helmet>
        <title>{t.meta.title}</title>
        <meta
          name="description"
          content={t.meta.description}
        />
      </Helmet>

      {/* Header */}
      <AnnihilationHeader
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Voxel Canvas Background */}
      <VoxelCanvasBackground />

      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="hero-title text-6xl md:text-8xl font-bold text-white mb-6">
            Annihilation
          </h1>

          <p className="hero-description text-xl md:text-2xl text-gray-300 mb-4">
            {t.hero.subtitle}
          </p>

          <p className="hero-description text-gray-400 mb-12 max-w-2xl mx-auto">
            {t.hero.description}
          </p>

          <div className="hero-actions flex gap-4 justify-center flex-wrap">
            <a
              href={currentVersion?.downloadUrl || '#'}
              className="download-button px-8 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-semibold 
                       text-black transition-all duration-300 hover:scale-105 transform 
                       flex items-center gap-2 shadow-lg"
            >
              <Download className="w-5 h-5" />
              {t.hero.downloadButton} {versions[0].version}
            </a>

            <a
              href="https://github.com/Pulse-Studio/Annihilation"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm rounded-lg font-semibold 
                       text-white border border-white/10 hover:bg-white/10 hover:border-white/20 
                       transition-all duration-300 hover:scale-105 transform flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Screenshots Section */}
      <ScreenshotsGallery className="fade-in-section relative z-10 py-24 px-6" language={language} />

      {/* Features Section */}
      <div className="relative z-10 py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="fade-in-section mb-16">
            <h2 className="text-4xl font-bold text-white text-center mb-12">{t.features.title}</h2>

            <div className="grid md:grid-cols-3 gap-8">
              {t.features.items.map((feature, index) => (
                <div
                  key={index}
                  className="feature-card bg-white/[0.02] border border-white/5 rounded-xl p-6 
                           hover:bg-white/[0.05] hover:border-cyan-500/20 transition-all duration-300"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* System Requirements */}
      <div className="relative z-10 py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="fade-in-section">
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              {t.systemRequirements.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">{t.systemRequirements.minimum.title}</h3>
                <ul className="space-y-3 text-gray-400">
                  {t.systemRequirements.minimum.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-white mb-6">{t.systemRequirements.recommended.title}</h3>
                <ul className="space-y-3 text-gray-400">
                  {t.systemRequirements.recommended.items.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Footer for Annihilation */}
      <footer className="relative z-10 bg-black/80 backdrop-blur-sm border-t border-white/5 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <a
              href="/"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
            >
              {t.footer.backToHome}
            </a>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Pulse-Studio/Annihilation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>

            <p className="text-gray-500 text-sm">
              {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};
