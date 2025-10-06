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
import { Helmet } from 'react-helmet-async';

const Home: FC = () => {
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

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pulse Studio" />
        <meta property="og:title" content="Pulse Studio — независимая команда интерактивных миров" />
        <meta
          property="og:description"
          content="Мы экспериментируем с воксельной графикой, физикой и web-технологиями, чтобы делиться свежими игровыми идеями."
        />
        <meta property="og:url" content="https://pulse-studio.github.io/" />
        <meta property="og:image" content="https://pulse-studio.github.io/logo.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pulse Studio — независимая команда интерактивных миров" />
        <meta
          name="twitter:description"
          content="Следите за развитием Annihilation и другими экспериментами Pulse Studio."
        />
        <meta name="twitter:image" content="https://pulse-studio.github.io/logo.png" />

        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Pulse Studio',
            url: 'https://pulse-studio.github.io/',
            logo: 'https://pulse-studio.github.io/logo.png',
            sameAs: [],
            description:
              'Pulse Studio создаёт воксельные игры и web-эксперименты, включая Annihilation.',
          })}
        </script>
      </Helmet>

      <Hero content={heroContent} />
      <About content={aboutContent} />
      <Team content={teamContent} />
      <Projects content={projectsContent} />
      <Contact content={contactContent} />
    </>
  );
};

export default Home;
