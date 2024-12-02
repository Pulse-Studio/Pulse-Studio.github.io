import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamContent } from '../../types/content';

interface TeamProps {
  content: TeamContent;
}

export const Team: FC<TeamProps> = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowExpandButton = content.members.length > 5;
  const displayedMembers = isExpanded ? content.members : content.members.slice(0, 5);

  return (
    <section id="team" className="py-20 bg-dark-custom">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          {content.title}
        </h2>
        <div className="grid md:grid-cols-5 gap-8">
          <AnimatePresence>
            {displayedMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="text-center hover-glow p-4 rounded-lg"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                />
                <h3 className="text-xl font-bold text-red-400">{member.name}</h3>
                <p className="text-gray-200">{member.role}</p>
                {member.github && (
                  <a
                    href={`https://github.com/${member.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-400 transition duration-300 mt-2 inline-block"
                  >
                    GitHub
                  </a>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {shouldShowExpandButton && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-red-900 hover:bg-red-800 px-6 py-2 rounded-full 
                         text-white transition duration-300 hover-glow"
            >
              {isExpanded ? 'Свернуть' : 'Показать всех'}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Team;