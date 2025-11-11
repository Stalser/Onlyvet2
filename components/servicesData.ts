// components/servicesData.ts
export type SpecialtyKey = 'Терапевт'|'Дерматолог'|'Кардиолог'|'Офтальмолог'|'Стоматолог'|'Поведенист';

export type Service = {
  slug: string;
  name: string;
  price?: string;
  duration?: string;
  emoji?: string;
  specialtyKey?: SpecialtyKey;
  category?: SpecialtyKey;
  photos?: string[];
};

export const services: Service[] = [
  { slug: 'chat-consult',   name: 'Чат‑консультация',     price: 'от 900 ₽',  duration: 'до 30 мин', emoji: '💬', category: 'Терапевт' },
  { slug: 'video-consult',  name: 'Видео‑консультация',   price: 'от 1 500 ₽',duration: '30 мин',    emoji: '🎥', specialtyKey: 'Терапевт', category: 'Терапевт' },
  { slug: 'triage',         name: 'Срочный триаж',        price: '1 200 ₽',   duration: '15–20 мин', emoji: '🚑', category: 'Терапевт' },
  { slug: 'second-opinion', name: 'Второе мнение',        price: '1 900 ₽',   duration: '30 мин',    emoji: '🩺', category: 'Терапевт' },
  { slug: 'derma-consult',  name: 'Дерматолог (онлайн)',  price: 'от 1 600 ₽',duration: '30–40 мин', emoji: '🧴', specialtyKey: 'Дерматолог', category: 'Дерматолог' },
  { slug: 'cardio-consult', name: 'Кардиолог (онлайн)',   price: 'от 2 000 ₽',duration: '40 мин',    emoji: '❤️', specialtyKey: 'Кардиолог',  category: 'Кардиолог' },
];

export const groups: Array<{ key: SpecialtyKey; label: string }> = [
  { key: 'Терапевт',    label: 'Терапевт' },
  { key: 'Дерматолог',  label: 'Дерматолог' },
  { key: 'Кардиолог',   label: 'Кардиолог' },
  { key: 'Офтальмолог', label: 'Офтальмолог' },
  { key: 'Стоматолог',  label: 'Стоматолог' },
  { key: 'Поведенист',  label: 'Поведенист' },
];
