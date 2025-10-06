import { FC, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projectsContent } from '../data/content';

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
        <Link to="/" className="text-green-400 hover:text-green-500">
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

  return (
    <div className="pt-32 pb-20">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/" 
            className="text-gray-400 hover:text-red-400 mb-8 inline-block transition-colors duration-300"
          >
            ← Вернуться на главную
          </Link>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl font-bold mb-6">{project.title}</h1>
              <p className="mb-8 text-gray-300">{project.description}</p>
              
              {project.links && (
                <div className="flex space-x-6">
                  {project.links.map((link, index) => (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="store-button px-8 py-4 rounded-lg text-lg font-medium hover-glow flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.icon && (
                        <img
                          src={link.icon}
                          alt={link.platform}
                          className="w-8 h-8 mr-2"
                        />
                      )}
                      {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
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
                    className="feature-card p-6 rounded-lg bg-red-900/10 hover:bg-red-900/20 transition-all duration-300"
                    variants={itemVariants}
                  >
                    <h3 className="text-xl font-bold mb-4 text-red-400">
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
