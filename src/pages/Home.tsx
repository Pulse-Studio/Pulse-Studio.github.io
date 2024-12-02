import { FC } from 'react';
import Hero from '../components/Hero';
import { About } from '../components/sections/About';
import { Team } from '../components/sections/Team';
import { Projects } from '../components/sections/Projects';
import { Contact } from '../components/sections/Contact';
import {
  heroContent,
  aboutContent,
  teamContent,
  projectsContent,
  contactContent,
} from '../data/content';

const Home: FC = () => {
  return (
    <>
      <Hero content={heroContent} />
      <About content={aboutContent} />
      <Team content={teamContent} />
      <Projects content={projectsContent} />
      <Contact content={contactContent} />
    </>
  );
};

export default Home;
