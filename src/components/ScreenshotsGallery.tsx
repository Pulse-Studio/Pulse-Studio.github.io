import { FC, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenshotsGalleryProps {
  className?: string;
  language?: 'ru' | 'en';
}

export const ScreenshotsGallery: FC<ScreenshotsGalleryProps> = ({ className = '', language = 'ru' }) => {
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const translations = {
    ru: {
      title: 'Скриншоты',
      counter: (current: number, total: number) => `${current} / ${total}`,
    },
    en: {
      title: 'Screenshots',
      counter: (current: number, total: number) => `${current} / ${total}`,
    },
  };

  const t = translations[language];

  useEffect(() => {
    // Загружаем скриншоты
    const loadScreenshots = async () => {
      setLoading(true);
      try {
        // Проверяем наличие скриншотов параллельно
        const checkPromises = Array.from({ length: 10 }, (_, i) => {
          const path = `/screenshots/annihilation-${i + 1}.png`;
          return new Promise<string | null>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(path);
            img.onerror = () => resolve(null);
            img.src = path;
          });
        });

        const results = await Promise.all(checkPromises);
        const validPaths = results.filter((path): path is string => path !== null);
        
        setScreenshots(validPaths);
      } catch (error) {
        console.error('Error loading screenshots:', error);
        setScreenshots([]);
      } finally {
        setLoading(false);
      }
    };

    loadScreenshots();
  }, []);

  if (loading) {
    return null;
  }

  if (screenshots.length === 0) {
    return null; // Секция не отображается если нет скриншотов
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className={`relative ${className}`}>
      <h2 className="text-4xl font-bold text-white text-center mb-12">{t.title}</h2>

      <div className="relative max-w-5xl mx-auto">
        {/* Main Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black/40 border border-white/5">
          <img
            src={screenshots[currentIndex]}
            alt={`Screenshot ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation Buttons */}
          {screenshots.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 
                         hover:bg-black/80 rounded-full flex items-center justify-center 
                         text-white transition-all hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 
                         hover:bg-black/80 rounded-full flex items-center justify-center 
                         text-white transition-all hover:scale-110"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
            <span className="text-white text-sm">
              {t.counter(currentIndex + 1, screenshots.length)}
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        {screenshots.length > 1 && (
          <div className="flex gap-4 mt-6 overflow-x-auto pb-4">
            {screenshots.map((screenshot, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 
                         transition-all ${
                           index === currentIndex
                             ? 'border-cyan-500 scale-105'
                             : 'border-white/10 hover:border-white/30'
                         }`}
              >
                <img
                  src={screenshot}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
