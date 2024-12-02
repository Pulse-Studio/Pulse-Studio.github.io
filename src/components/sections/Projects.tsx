import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ProjectsContent, Project } from '../../types/content';

interface ProjectsProps {
  content: ProjectsContent;
}

const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  return (
    <div 
      className="card-gradient rounded-lg overflow-hidden hover-glow transition-all duration-300"
      data-aos="fade-up"
    >
      <Link to={`/${project.id}`}>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-4 text-red-400">
            {project.title}
          </h3>
          <p className="mb-4 text-gray-300">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-red-900 bg-opacity-50 px-3 py-1 rounded-full text-sm text-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.links && (
            <div className="mt-4 flex gap-4">
              {project.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-300 hover:text-red-400 transition duration-300"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.icon && (
                    <img
                      src={link.icon}
                      alt={link.platform}
                      className="w-6 h-6 mr-2"
                    />
                  )}
                  {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                </a>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export const Projects: FC<ProjectsProps> = ({ content }) => {
  return (
    <section id="projects" className="py-20 bg-dark-secondary">
      <div className="container mx-auto px-4">
        <h2 
          className="text-4xl font-bold mb-12 text-center text-white"
          data-aos="fade-up"
        >
          {content.title}
        </h2>
        {content.description && (
          <p 
            className="text-center text-gray-300 mb-12 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {content.description}
          </p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {content.projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

