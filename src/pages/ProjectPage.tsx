import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { projectsContent } from '../data/content';

const MotionLink = motion(Link);
const siteUrl = 'https://pulse-studio.github.io';

export const ProjectPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const project = projectsContent.projects.find(p => p.id === id);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} - Pulse Studio`;
      
      return () => {
        document.title = `Pulse Studio`;
      };
    }
  }, [project]);

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-8">Проект не найден</h1>
        <Link to="/" className="text-gray-300 hover:text-white">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const canonicalUrl = `${siteUrl}/${project.id}`;

  return (
    <div className="pt-32 pb-20">
      <Helmet>
        <title>{`${project.title} — Pulse Studio`}</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`${project.title} — Pulse Studio`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={`${siteUrl}${project.image}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} — Pulse Studio`} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={`${siteUrl}${project.image}`} />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoGame',
            name: project.title,
            url: canonicalUrl,
            image: `${siteUrl}${project.image}`,
            description: project.description,
            operatingSystem: 'Web',
            genre: project.tags,
            author: {
              '@type': 'Organization',
              name: 'Pulse Studio',
              url: siteUrl,
            },
          })}
        </script>
      </Helmet>
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/" 
            className="text-gray-400 hover:text-gray-100 mb-8 inline-block transition-colors duration-300"
          >
            ← Вернуться на главную
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
              <p className="mb-8 text-gray-300">{project.description}</p>
              
              {project.links && (
                <div className="flex space-x-6">
                  {project.links.map((link, index) => {
                    const isDownload = link.platform === 'download';
                    const isInternal = link.platform === 'page';
                    const isExternal = link.external ?? (!isDownload && !isInternal);
                    const label =
                      link.label ??
                      (isDownload
                        ? 'Скачать'
                        : isInternal
                        ? 'Подробнее'
                        : link.platform);

                    const iconNode = link.icon
                      ? typeof link.icon === 'string' && link.icon.startsWith('http')
                        ? (
                            <img src={link.icon} alt={label} className="w-6 h-6 mr-2" />
                          )
                        : (
                            <span className="text-base mr-2">{link.icon}</span>
                          )
                      : null;

                    if (isInternal) {
                      return (
                        <MotionLink
                          key={index}
                          to={link.url}
                          className="store-button px-8 py-4 rounded-lg text-lg font-medium hover-glow flex items-center"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {iconNode}
                          {label}
                        </MotionLink>
                      );
                    }

                    return (
                      <motion.a
                        key={index}
                        href={link.url}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        download={isDownload}
                        className="store-button px-8 py-4 rounded-lg text-lg font-medium hover-glow flex items-center"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {iconNode}
                        {label}
                      </motion.a>
                    );
                  })}
                </div>
              )}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={project.image}
                alt={`${project.title} Gameplay`}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>

          {project.features && (
            <motion.section 
              className="py-20"
              variants={containerVariants}
            >
              <h2 className="text-4xl font-bold mb-12 text-center">
                Особенности игры
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {project.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="feature-card p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                    variants={itemVariants}
                  >
                    <h3 className="text-xl font-semibold mb-4 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </motion.div>
    </div>
  );
};
