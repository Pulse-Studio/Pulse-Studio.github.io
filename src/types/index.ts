export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    github?: string;
  }
  
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  path: string;
  links?: {
    steam?: string;
    itch?: string;
    download?: string;
  };
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
}