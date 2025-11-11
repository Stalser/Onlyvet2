// components/servicesData.ts
export type Service = {
  slug: string;
  name: string;
  emoji: string;      // эмодзи вместо svg
  desc: string;
  price: string;
  duration?: string;
  category: 'popular'|'specialty'|'package';
};

export const services: Service[] = [
  // popular
  { slug: 'chat-consult',   name: 'Чат‑консультация',   emoji: '💬', desc: 'Быстрый старт, первичная оценка, маршрутизация.', price: 'от 900 ₽',  duration: 'до 30 мин', category:'popular' },
  { slug: 'video-consult',  name: 'Видео‑консультация', emoji: '📹', desc: 'Подробный разбор, план обследования и терапии.',   price: 'от 1 500 ₽',duration: '30 мин', category:'popular' },
  { slug: 'urgent-triage',  name: 'Срочный триаж',      emoji: '🚑', desc: 'Оценка рисков, алгоритм на ближайшие часы.',      price: '1 200 ₽',   category:'popular' },

  // specialty
  { slug: 'derma',          name: 'Дерматология онлайн',emoji:'🧴', desc: 'Зуд, отиты, план диагностики и лечения.',           price: 'от 1 400 ₽',category:'specialty' },
  { slug: 'cardio',         name: 'Кардиология онлайн',emoji:'❤️', desc: 'Подозрение на ХСН, план обследования.',             price: 'от 1 600 ₽',category:'specialty' },
  { slug: 'behaviour',      name: 'Поведение питомца',  emoji:'🐾', desc: 'Тревожность, адаптация, привычки.',                price: '1 300 ₽',   category:'specialty' },
  { slug: 'ophtha',         name: 'Офтальмология',      emoji:'👁️', desc: 'Покраснение, травмы, уход за глазами.',            price: 'от 1 400 ₽',category:'specialty' },

  // packages
  { slug: 'second-opinion', name: 'Второе мнение',      emoji:'🩺', desc: 'Независимая оценка назначений и анализов.',         price: '1 900 ₽',   category:'package' },
  { slug: 'diet',           name: 'Подбор рациона',     emoji:'🥗', desc: 'Рацион при хронических состояниях.',               price: '1 200 ₽',   category:'package' },
  { slug: 'followup',       name: 'Контроль 72 часа',   emoji:'⏱️', desc: 'Повторная связь и коррекция терапии.',             price: 'включено',  category:'package' }
];

export const groups = [
  { key:'popular',   label:'Популярное' },
  { key:'specialty', label:'Специализации' },
  { key:'package',   label:'Пакеты' },
] as const;
