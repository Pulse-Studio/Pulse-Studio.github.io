import { HeroContent, AboutContent, TeamContent, ContactContent, ProjectsContent } from "../types/content";

export const heroContent: HeroContent = {
    texts: [
      'Создаем <span class="text-red-500 font-extrabold">миры</span>',
      'Создаем <span class="text-red-500 font-extrabold">незабываемый опыт</span>',
      'Создаем <span class="text-red-500 font-extrabold">мечты</span>',
      '<span class="text-red-500 font-extrabold glow-text">Мы создаем игры</span>'
    ],
    subtitle: 'Игровая инди студия с фокусом на инновационный геймплей',
    ctaButton: {
      text: 'Наши проекты',
      link: '/#projects'
    }
  };
  
  export const aboutContent: AboutContent = {
    title: 'О нас',
    cards: [
      {
        id: 'innovations',
        icon: '💡',
        title: 'Инновации',
        description: 'Создаем уникальные игровые механики и незабываемые впечатления'
      },
      {
        id: 'quality',
        icon: '🎯',
        title: 'Качество',
        description: 'Внимание к деталям и высокие стандарты разработки'
      },
      {
        id: 'community',
        icon: '🤝',
        title: 'Сообщество',
        description: 'Открытое взаимодействие с игроками и разработчиками'
      }
    ]
  };
  
  export const teamContent: TeamContent = {
    title: 'Наша команда',
    members: [
      {
        id: 'saks',
        name: 'SAKS',
        role: 'Гейм-дизайнер',
        image: 'https://github.com/Saksilia.png',
        github: 'Saksilia'
      },
      {
        id: 'shifty',
        name: 'Shifty',
        role: 'Архитектор',
        image: 'https://github.com/ShiftyX1.png',
        github: 'ShiftyX1'
      },
      {
        id: 'clw',
        name: 'clw',
        role: 'UI/UX дизайнер',
        image: 'https://github.com/clw.png',
        github: 'clw'
      },
      {
        id: 'zhuk',
        name: 'Zhuk',
        role: 'Геймплей программист',
        image: 'https://github.com/ZhiktorViktor.png',
        github: 'ZhiktorViktor'
      },
      {
        id: 'svinopesik',
        name: 'Svinopesik',
        role: 'Графический программист',
        image: 'https://github.com/Svinopesik.png',
        github: 'Svinopesik'
      },
    ]
  };

  export const projectsContent: ProjectsContent = {
    title: 'Наши проекты',
    projects: [
      {
        id: 'dicequest',
        title: 'DiceQuest',
        description: 'Рогалик с использованием игральных костей в стиле Balatro. Комбинируйте броски, создавайте уникальные стратегии и погружайтесь в мир случайности и тактики.',
        image: '/dicequest.png',
        tags: ['Рогалик', 'Godot Engine', 'В разработке'],
        links: [
          {
            platform: 'steam',
            url: 'https://store.steampowered.com',
            icon: 'https://store.steampowered.com/favicon.ico'
          },
          {
            platform: 'itch',
            url: 'https://itch.io',
            icon: 'https://itch.io/favicon.ico'
          }
        ],
        features: [
          {
            title: 'Уникальная механика костей',
            description: 'Каждая кость имеет особые свойства и может быть улучшена для создания мощных комбинаций'
          },
          {
            title: 'Процедурная генерация',
            description: 'Каждое прохождение уникально благодаря процедурной генерации событий и наград'
          },
          {
            title: 'Глубокая стратегия',
            description: 'Создавайте собственные стратегии, комбинируя различные кости и способности'
          }
        ]
      },
    ]
  };  
  
export const contactContent: ContactContent = {
  title: 'Свяжитесь с нами',
  email: 'pulseteam@ya.ru',
  socials: []
};