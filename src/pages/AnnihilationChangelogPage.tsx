import { FC, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download } from 'lucide-react';
import { gsap } from 'gsap';
import { HTMLViewer } from '../components/HTMLViewer';
import { AnnihilationHeader } from '../components/AnnihilationHeader';
import { VoxelCanvasBackground } from '../components/VoxelCanvasBackground';
import { annihilationTranslations } from '../data/annihilationContent';
import '../styles/annihilation-fonts.css';

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
    // downloadUrl: '/downloads/0.15.0.7z',
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

export const AnnihilationChangelogPage: FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<string>(versions[0].version);
  const [language, setLanguage] = useState<'ru' | 'en'>(() => {
    const saved = localStorage.getItem('annihilation-language');
    return (saved === 'en' || saved === 'ru') ? saved : 'ru';
  });

  const t = annihilationTranslations[language];
  const currentVersion = versions.find((v) => v.version === selectedVersion);

  useEffect(() => {
    localStorage.setItem('annihilation-language', language);
  }, [language]);

  useEffect(() => {
    gsap.fromTo('.page-title', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo('.version-selector',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
    );

    gsap.fromTo('.content-container',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power3.out' }
    );
  }, []);

  return (
    <div className="annihilation-page min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <Helmet>
        <title>{t.changelog.title} - Annihilation</title>
        <meta name="description" content={t.changelog.title} />
      </Helmet>

      <AnnihilationHeader
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Voxel Canvas Background */}
      <VoxelCanvasBackground />

      {/* Changelog Section */}
      <div className="relative z-10 pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="page-title text-4xl md:text-5xl font-bold text-white text-center mb-12">
            {t.changelog.title}
          </h1>

          {/* Version selector */}
          <div className="version-selector flex gap-4 mb-12 flex-wrap justify-center">
            {versions.map((version) => (
              <button
                key={version.version}
                onClick={() => setSelectedVersion(version.version)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300
                         ${
                           selectedVersion === version.version
                             ? 'bg-cyan-500 text-black version-active shadow-lg shadow-cyan-500/50 scale-105'
                             : 'bg-gray-800/80 text-gray-300 hover:bg-gray-700/80 hover:text-white border border-cyan-500/20 hover:border-cyan-500/40'
                         }`}
              >
                v{version.version}
              </button>
            ))}
          </div>

          {/* Changelog content */}
          {currentVersion && (
            <div className="content-container bg-gray-900/90 border border-cyan-500/20 rounded-xl p-8 backdrop-blur-md shadow-2xl shadow-cyan-500/10">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {t.changelog.versionLabel} {currentVersion.version}
                  </h2>
                  <p className="text-gray-400">{currentVersion.date}</p>
                </div>
                {currentVersion.downloadUrl && (
                  <a
                    href={currentVersion.downloadUrl}
                    className="px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 
                             text-cyan-400 rounded-lg font-semibold transition-all 
                             duration-300 flex items-center gap-2 border border-cyan-500/30
                             hover:shadow-lg hover:shadow-cyan-500/30"
                  >
                    <Download className="w-4 h-4" />
                    {t.changelog.downloadButton}
                  </a>
                )}
              </div>

              <HTMLViewer url={currentVersion.changelogUrl[language]} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
