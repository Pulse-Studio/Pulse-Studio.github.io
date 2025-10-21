import { FooterContent } from "../types/footer";

export const footerContent: FooterContent = {
    copyrightText: '© 2025 Pulse Studio.',
    links: [
      {
        id: 'privacy',
        text: 'Политика конфиденциальности',
        url: '/privacy'
      },
      {
        id: 'terms',
        text: 'Условия использования',
        url: '/terms'
      }
    ],
    socials: [
      {
        id: 'github',
        icon: 'github',
        url: 'https://github.com/Pulse-Studio',
        label: 'GitHub'
      },
      // {
      //   id: 'discord',
      //   icon: 'discord',
      //   url: 'https://discord.gg/your-server',
      //   label: 'Discord'
      // }
    ],
    email: 'pulseteam@ya.ru'
  };
  