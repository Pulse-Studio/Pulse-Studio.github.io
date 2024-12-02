import { FooterContent } from "../types/footer";

export const footerContent: FooterContent = {
    copyrightText: '© 2024 Pulse Studio. Все права защищены.',
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
        url: 'https://github.com/your-org',
        label: 'GitHub'
      },
      {
        id: 'discord',
        icon: 'discord',
        url: 'https://discord.gg/your-server',
        label: 'Discord'
      }
    ],
    email: 'pulseteam@ya.ru'
  };
  