# Scroll-Driven Animation Landing Page

## Обзор

Полностью переработанный лендинг с плавными scroll-driven анимациями на базе GSAP и интерактивной 3D сценой на Three.js.

## Ключевые особенности

### 🎬 Scroll-Driven Animations
- **Плавное построение контента** - элементы появляются и "строятся" по мере прокрутки
- **Синхронизация с 3D сценой** - 3D объекты трансформируются вместе со скроллом
- **Оптимизированная производительность** - использование GSAP ScrollTrigger с scrub для плавности
- **Responsive анимации** - адаптация под разные устройства

### 🎮 3D Сцена (Enhanced3DScene)
- Интерактивная сетка кубов с металлическими материалами
- Раскрытие структуры при скролле (от центра к краям)
- Динамическое освещение с point lights
- Плавные переходы камеры
- Оптимизация рендеринга с тенями

### 📦 Компоненты

#### ScrollSection
Обёртка для секций с анимацией появления:
- Fade in + slide up эффект
- Настраиваемая задержка
- ScrollTrigger интеграция

#### RevealCard
Карточки с 3D эффектом появления:
- Scale + rotate transform
- Последовательное появление (stagger)
- Hover эффекты

#### AnimatedText
Анимированный текст по словам:
- Разбивка на слова
- Последовательное появление
- Синхронизация со скроллом

### 🎨 Стилизация

Новый файл `scroll-animations.css` включает:
- Кастомный scrollbar с градиентом
- GPU-ускоренные трансформации
- Gradient mesh backgrounds
- Glow эффекты
- Респонсивные медиа-запросы
- Поддержка prefers-reduced-motion

## Структура анимаций

```
Hero Section
├── Fade in title (delay 0.5s)
├── Fade in subtitle (delay 0.8s)
├── Fade in CTA (delay 1.1s)
└── Parallax на скролле (yPercent: 30)

3D Scene
├── Кубы раскрываются из центра
├── Rotation группы (360°)
├── Camera zoom out
└── Lights движутся в стороны

Content Sections
├── About Cards (reveal с задержкой)
├── Projects Grid (stagger animation)
├── Team Members (3D flip effect)
└── Contact Form (fade in)
```

## Технические детали

### GSAP ScrollTrigger
```typescript
scrollTrigger: {
  trigger: element,
  start: 'top 85%',
  end: 'top 60%',
  scrub: 1, // Плавная синхронизация
  toggleActions: 'play none none reverse'
}
```

### Three.js Оптимизации
- Shadow mapping с PCF
- Антиалиасинг
- Alpha transparency
- Эффективный рендер цикл
- Proper cleanup on unmount

### Performance
- Will-change hints для GPU acceleration
- Transform: translateZ(0) для композитинга
- Lazy loading для тяжелых ресурсов
- Debounced resize handlers

## Как использовать

### Запуск dev сервера
```bash
npm run dev
```

### Сборка для продакшена
```bash
npm run build
```

## Кастомизация

### Изменение скорости анимаций
В `ScrollDrivenHome.tsx`:
```typescript
scrollTrigger: {
  scrub: 1, // Увеличьте для более медленной синхронизации
}
```

### Настройка 3D сцены
В `Enhanced3DScene.tsx`:
```typescript
const gridSize = 5; // Количество кубов
const spacing = 2;  // Расстояние между кубами
```

### Добавление новых анимаций
Используйте хук `useGSAP` и пресеты из `minecraftAnimations`:
```typescript
import { minecraftAnimations } from '../hooks/useGSAP';

minecraftAnimations.blockReveal('.my-element', 0.5);
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Зависимости
- React 18.3+
- GSAP 3.13+
- Three.js 0.180+
- React Router 7+
- Tailwind CSS 3.4+

## License
MIT
