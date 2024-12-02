export interface HeroContent {
    texts: string[];
    subtitle: string;
    ctaButton: {
      text: string;
      link: string;
    };
}

export interface AboutCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface AboutContent {
  title: string;
  cards: AboutCard[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  github: string;
}

export interface TeamContent {
  title: string;
  members: TeamMember[];
}

export interface ContactContent {
  title: string;
  email: string;
  socials: {
    icon: string;
    link: string;
  }[];
}

export interface ProjectLink {
    platform: 'steam' | 'itch' | 'github' | 'custom';
    url: string;
    icon?: string;
  }
  
  export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    links?: ProjectLink[];
    features?: {
      title: string;
      description: string;
    }[];
  }
  
  export interface ProjectsContent {
    title: string;
    description?: string;
    projects: Project[];
  }
  