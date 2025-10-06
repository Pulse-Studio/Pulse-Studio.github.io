import { FC, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectsContent } from '../../types/content';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  content: ProjectsContent;
}

export const Projects: FC<ProjectsProps> = ({ content }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0.3, y: 32 },
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

      if (descriptionRef.current) {
        gsap.fromTo(
          descriptionRef.current,
          { opacity: 0.2, y: 28 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 78%',
              end: 'top 58%',
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
    <section ref={sectionRef} id="projects" className="py-16 bg-dark-secondary">
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-semibold text-center text-white mb-8"
        >
          {content.title}
        </h2>

        {content.description && (
          <p
            ref={descriptionRef}
            className="text-center text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            {content.description}
          </p>
        )}

        <div className="space-y-6">
          {content.projects.map((project, index) => (
            <div
              key={project.id}
              ref={setCardRef(index)}
              className="rounded-xl border border-white/10 bg-white/5 p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full md:w-64 h-40 md:h-48 object-cover rounded-lg"
                />

                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-gray-200">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 rounded-full border border-white/15 bg-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.links && project.links.length > 0 && (
                    <div className="flex flex-wrap gap-4 text-sm text-gray-200">
                      {project.links.map((link, linkIndex) => {
                        const isDownload = link.platform === 'download';
                        const isProjectPage = link.platform === 'page';
                        const isExternal = link.external ?? (!isDownload && !isProjectPage);
                        const label =
                          link.label ??
                          (isDownload
                            ? 'Скачать билд'
                            : isProjectPage
                            ? 'Страница проекта'
                            : link.platform);

                        const iconNode =
                          link.icon && typeof link.icon === 'string' && link.icon.startsWith('http')
                            ? <img src={link.icon} alt={label} className="w-4 h-4" />
                            : <span>{link.icon ?? '↘'}</span>;

                        if (isProjectPage) {
                          return (
                            <Link
                              key={linkIndex}
                              to={link.url}
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                            >
                              {iconNode}
                              {label}
                            </Link>
                          );
                        }

                        return (
                          <a
                            key={linkIndex}
                            href={link.url}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                            target={isExternal ? '_blank' : undefined}
                            rel={isExternal ? 'noopener noreferrer' : undefined}
                            download={isDownload || undefined}
                          >
                            {iconNode}
                            {label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

