import { HeroContent, AboutContent, TeamContent, ContactContent, ProjectsContent } from "../types/content";

export const heroContent: HeroContent = {
  texts: [
    'Pulse Studio — независимая команда, создающая интерактивные миры'
  ],
  subtitle: 'Мы экспериментируем с воксельной графикой, физикой и web‑технологиями, чтобы делиться свежими игровыми идеями.',
  ctaButton: {
    text: 'Познакомиться с Annihilation',
    link: '/annihilation'
  }
};

export const aboutContent: AboutContent = {
  title: 'О Pulse Studio',
  cards: [
    {
      id: 'experiments',
      icon: '🧪',
      title: 'Игровые эксперименты',
      description: 'Прототипируем смелые механики и находим новые способы взаимодействия игроков с миром.'
    },
    {
      id: 'openness',
      icon: '🤝',
      title: 'Открытое развитие',
      description: 'Делимся прогрессом, собираем фидбек и выпускаем сборки, когда есть что показать.'
    },
    {
      id: 'technology',
      icon: '�',
      title: 'Технологический фокус',
      description: 'Работаем с ThreeJS, физикой частиц и WebGPU, чтобы игры работали прямо в браузере.'
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
    title: 'Проекты Pulse Studio',
    description: 'Сейчас мы сосредоточены на Annihilation — воксельной песочнице, которая развивается вместе с комьюнити. Ниже можно перейти на страницу проекта или скачать свежую сборку.',
    projects: [
      {
        id: 'annihilation',
        title: 'Annihilation',
        description: 'Современная реализация Minecraft с использованием ThreeJS. Строй, исследуй и выживай в бесконечном вокселном мире прямо в браузере. Полная свобода творчества без ограничений.',
        image: '/annihilation.png',
        tags: ['Песочница', 'ThreeJS', 'Альфа v0.11.5'],
        links: [
          {
            // @ts-ignore
            platform: 'Страница проекта',
            url: '/annihilation',
            icon: '↗',
            label: 'Страница проекта'
          },
          {
            // @ts-ignore
            platform: 'Загрузить',
            url: '/0.11.5.7z',
            icon: '/download.png',
            label: 'Скачать билд'
          }
        ],
        features: [
          {
            title: 'Воксельный мир',
            description: 'Полностью разрушаемое и строящееся окружение с реалистичной физикой блоков.'
          },
          {
            title: 'Веб-технологии',
            description: 'Работает на ThreeJS для максимальной производительности и доступности прямо в браузере.'
          },
          {
            title: 'Бесконечные возможности',
            description: 'Создавайте свои миры, стройте сложные конструкции и делитесь ими с друзьями.'
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