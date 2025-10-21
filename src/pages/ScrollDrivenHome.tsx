import { FC, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Enhanced3DScene } from '../components/Enhanced3DScene';
import { ScrollSection } from '../components/ScrollSection';
import { RevealCard } from '../components/RevealCard';
import { AnimatedText } from '../components/AnimatedText';
import {
  heroContent,
  aboutContent,
  teamContent,
  projectsContent,
  contactContent,
} from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const ScrollDrivenHome: FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero секция анимации
    const ctx = gsap.context(() => {
      if (heroTitleRef.current) {
        gsap.fromTo(
          heroTitleRef.current,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: 0.5,
            ease: 'power3.out',
          }
        );
      }

      if (heroSubtitleRef.current) {
        gsap.fromTo(
          heroSubtitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power2.out',
          }
        );
      }

      if (heroCtaRef.current) {
        gsap.fromTo(
          heroCtaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 1.1,
            ease: 'power2.out',
          }
        );
      }

      // Parallax эффект для hero
      if (heroRef.current) {
        gsap.to(heroRef.current, {
          yPercent: 30,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const displayText = heroContent.texts[heroContent.texts.length - 1] ?? heroContent.texts[0];

  return (
    <>
      <Helmet>
        <title>Pulse Studio — независимая команда интерактивных миров</title>
        <meta
          name="description"
          content="Pulse Studio создаёт воксельные игры и web-эксперименты. Следите за развитием Annihilation и других проектов студии."
        />
        <meta
          name="keywords"
          content="Pulse Studio, Annihilation, веб-игра, воксельная песочница, инди студия"
        />
        <link rel="canonical" href="https://pulse-studio.github.io/" />
      </Helmet>

      {/* 3D сцена с синхронизацией скролла */}
      <Enhanced3DScene />

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 z-[1]" />
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1
            ref={heroTitleRef}
            className="text-5xl md:text-7xl font-bold mb-6 text-white opacity-0"
            dangerouslySetInnerHTML={{ __html: displayText }}
          />
          
          <p
            ref={heroSubtitleRef}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0"
          >
            {heroContent.subtitle}
          </p>
          
          <div ref={heroCtaRef} className="flex gap-4 justify-center flex-wrap opacity-0">
            <Link
              to={heroContent.ctaButton.link}
              className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-semibold 
                       text-black shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 
                       hover:scale-105 transform"
            >
              {heroContent.ctaButton.text}
            </Link>
            <a
              href="#projects"
              className="px-8 py-4 bg-white/5 backdrop-blur-sm rounded-lg font-semibold 
                       text-white border border-white/10 hover:bg-white/10 hover:border-white/20 
                       transition-all duration-300 hover:scale-105 transform"
            >
              Наши проекты
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce">
            <svg
              className="w-6 h-6 text-white/60"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* About Section */}
      <ScrollSection id="about" className="py-24 bg-black/70">
        <div className="container mx-auto px-4">
          <AnimatedText
            text={aboutContent.title}
            tag="h2"
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          />

          <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
            {aboutContent.cards.map((card, index) => (
              <RevealCard key={card.id} index={index}>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 
                              text-left h-full hover:bg-white/[0.05] transition-all duration-300
                              hover:border-cyan-500/20">
                  <div className="text-5xl mb-6">{card.icon}</div>
                  <h3 className="text-2xl font-semibold text-white mb-4">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Projects Section */}
      <ScrollSection id="projects" className="py-24 bg-black/60">
        <div className="container mx-auto px-4">
          <AnimatedText
            text={projectsContent.title}
            tag="h2"
            className="text-4xl md:text-5xl font-bold text-center text-white mb-6"
          />

          {projectsContent.description && (
            <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
              {projectsContent.description}
            </p>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {projectsContent.projects.map((project, index) => (
              <RevealCard key={project.id} index={index}>
                <Link
                  to={`/projects/${project.id}`}
                  className="block group"
                >
                  <div className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] 
                                backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300
                                hover:border-cyan-500/20 hover:scale-[1.02] transform">
                    {project.image && (
                      <div className="aspect-video overflow-hidden bg-black/40">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span 
                              key={i}
                              className="inline-block px-3 py-1 bg-cyan-500/10 text-cyan-400 
                                       rounded-full text-sm font-medium border border-cyan-500/20">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </RevealCard>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Team Section */}
      <ScrollSection id="team" className="py-24 bg-black/70">
        <div className="container mx-auto px-4">
          <AnimatedText
            text={teamContent.title}
            tag="h2"
            className="text-4xl md:text-5xl font-bold text-center text-white mb-16"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {teamContent.members.map((member, index) => (
              <RevealCard key={member.id} index={index}>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8 
                              text-center hover:bg-white/[0.05] transition-all duration-300
                              hover:border-cyan-500/20">
                  {member.image && (
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden 
                                  border-2 border-white/10">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold text-white mb-2">{member.name}</h3>
                  <p className="text-cyan-400 mb-4 font-medium">{member.role}</p>
                  
                  {member.github && (
                    <a 
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      @{member.github}
                    </a>
                  )}
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Contact Section */}
      <ScrollSection id="contact" className="py-24 bg-black/60">
        <div className="container mx-auto px-4">
          <AnimatedText
            text={contactContent.title}
            tag="h2"
            className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
          />

          <div className="max-w-md mx-auto">
            <RevealCard index={0}>
              <div className="rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-8
                            hover:bg-white/[0.05] transition-all duration-300">
                {contactContent.email && (
                  <a
                    href={`mailto:${contactContent.email}`}
                    className="block text-center py-4 px-6 bg-cyan-500 hover:bg-cyan-400 
                             rounded-lg font-semibold text-black transition-all duration-300 
                             hover:scale-105 transform mb-4"
                  >
                    Написать нам
                  </a>
                )}

                {contactContent.socials && contactContent.socials.length > 0 && (
                  <div className="flex gap-4 justify-center mt-6">
                    {contactContent.socials.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/5 rounded-lg hover:bg-cyan-500/10 
                                 hover:border-cyan-500/20 border border-white/5 transition-all 
                                 duration-300 hover:scale-110 transform"
                      >
                        <span className="text-2xl">{social.icon}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </RevealCard>
          </div>
        </div>
      </ScrollSection>
    </>
  );
};

export default ScrollDrivenHome;
