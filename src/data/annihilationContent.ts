interface AnnihilationTranslations {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    subtitle: string;
    description: string;
    downloadButton: string;
  };
  features: {
    title: string;
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  news: {
    title: string;
    versionLabel: string;
    downloadButton: string;
  };
  changelog: {
    title: string;
    versionLabel: string;
    downloadButton: string;
  };
  systemRequirements: {
    title: string;
    minimum: {
      title: string;
      items: string[];
    };
    recommended: {
      title: string;
      items: string[];
    };
  };
  footer: {
    backToHome: string;
    copyright: string;
  };
}

export const annihilationTranslations: Record<'ru' | 'en', AnnihilationTranslations> = {
  ru: {
    meta: {
      title: 'Annihilation — Voxel Sandbox Game | Pulse Studio',
      description: 'Современная реализация Minecraft на ThreeJS. Строй, исследуй и выживай в бесконечном вокселном мире.',
    },
    hero: {
      subtitle: 'Воксельная песочница нового поколения',
      description: 'Современная реализация Minecraft с использованием ThreeJS. Строй, исследуй и выживай в бесконечном вокселном мире. Полная свобода творчества без ограничений.',
      downloadButton: 'Скачать',
    },
    features: {
      title: 'Особенности',
      items: [
        {
          icon: '🎮',
          title: 'Готов к игре',
          description: 'Скачай и запусти. Оптимизированный клиент для максимальной производительности.',
        },
        {
          icon: '🌍',
          title: 'Бесконечный мир',
          description: 'Процедурно генерируемый мир с различными биомами и ландшафтами.',
        },
        {
          icon: '🔨',
          title: 'Полная свобода',
          description: 'Стройте что угодно. Разрушайте, создавайте, экспериментируйте.',
        },
        {
          icon: '🎨',
          title: 'Воксельная графика',
          description: 'Современная реализация классической блочной эстетики.',
        },
        {
          icon: '⚡',
          title: 'Оптимизация',
          description: 'Высокая производительность благодаря современным технологиям.',
        },
        {
          icon: '🔧',
          title: 'В разработке',
          description: 'Регулярные обновления и новые возможности каждый месяц.',
        },
      ],
    },
    news: {
      title: 'Новости',
      versionLabel: 'Версия',
      downloadButton: 'Скачать',
    },
    changelog: {
      title: 'История обновлений',
      versionLabel: 'Версия',
      downloadButton: 'Скачать',
    },
    systemRequirements: {
      title: 'Системные требования',
      minimum: {
        title: 'Минимальные',
        items: [
          'Windows 10 / macOS 10.15 / Linux',
          '4 GB RAM',
          'Integrated Graphics',
          '500 MB свободного места',
        ],
      },
      recommended: {
        title: 'Рекомендуемые',
        items: [
          'Windows 11 / macOS 12+ / Linux',
          '8 GB RAM',
          'Dedicated Graphics Card',
          '1 GB свободного места',
        ],
      },
    },
    footer: {
      backToHome: '← Вернуться на главную',
      copyright: '© {year} Pulse Studio',
    },
  },
  en: {
    meta: {
      title: 'Annihilation — Voxel Sandbox Game | Pulse Studio',
      description: 'Modern Minecraft implementation using ThreeJS. Build, explore and survive in an infinite voxel world.',
    },
    hero: {
      subtitle: 'Next-generation voxel sandbox',
      description: 'Modern Minecraft implementation using ThreeJS. Build, explore and survive in an infinite voxel world. Complete creative freedom without limitations.',
      downloadButton: 'Download',
    },
    features: {
      title: 'Features',
      items: [
        {
          icon: '🎮',
          title: 'Ready to Play',
          description: 'Download and launch. Optimized client for maximum performance.',
        },
        {
          icon: '🌍',
          title: 'Infinite World',
          description: 'Procedurally generated world with various biomes and landscapes.',
        },
        {
          icon: '🔨',
          title: 'Complete Freedom',
          description: 'Build anything. Destroy, create, experiment.',
        },
        {
          icon: '🎨',
          title: 'Voxel Graphics',
          description: 'Modern implementation of classic blocky aesthetics.',
        },
        {
          icon: '⚡',
          title: 'Optimization',
          description: 'High performance thanks to modern technologies.',
        },
        {
          icon: '🔧',
          title: 'In Development',
          description: 'Regular updates and new features every month.',
        },
      ],
    },
    news: {
      title: "What's New",
      versionLabel: 'Version',
      downloadButton: 'Download',
    },
    changelog: {
      title: 'Changelog',
      versionLabel: 'Version',
      downloadButton: 'Download',
    },
    systemRequirements: {
      title: 'System Requirements',
      minimum: {
        title: 'Minimum',
        items: [
          'Windows 10 / macOS 10.15 / Linux',
          '4 GB RAM',
          'Integrated Graphics',
          '500 MB free space',
        ],
      },
      recommended: {
        title: 'Recommended',
        items: [
          'Windows 11 / macOS 12+ / Linux',
          '8 GB RAM',
          'Dedicated Graphics Card',
          '1 GB free space',
        ],
      },
    },
    footer: {
      backToHome: '← Back to Home',
      copyright: '© {year} Pulse Studio',
    },
  },
};
