export interface FooterLink {
    id: string;
    text: string;
    url: string;
  }
  
  export interface SocialLink {
    id: string;
    icon: string;
    url: string;
    label: string;
  }
  
  export interface FooterContent {
    copyrightText: string;
    links?: FooterLink[];
    socials?: SocialLink[];
    email?: string;
  }