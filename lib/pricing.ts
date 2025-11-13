// lib/pricing.ts
export type ServiceItem = {
  code: string;
  section: string;
  name: string;
  description: string;
  priceRUB?: number;
  duration?: string;
  note?: string;
};

export const servicesPricing: ServiceItem[] = [
  {
    code: 'OC1',
    section: 'Онлайн-консультации',
    name: 'Первичная онлайн-консультация',
    description: 'Видеозвонок/чат, один пациент',
    priceRUB: undefined,
    duration: '30 мин',
  },
  {
    code: 'OC2',
    section: 'Онлайн-консультации',
    name: 'Повторная консультация',
    description: 'С тем же врачом по текущему случаю',
    priceRUB: undefined,
    duration: '20 мин',
  },
  {
    code: 'OC3',
    section: 'Онлайн-консультации',
    name: 'Разбор анализов',
    description: 'Интерпретация загруженных результатов',
    priceRUB: undefined,
    duration: '20–30 мин',
  },
  {
    code: 'TH1',
    section: 'Терапия',
    name: 'Консультация терапевта',
    description: 'Общий терапевтический приём',
    priceRUB: undefined,
    duration: '30–40 мин',
  },
  {
    code: 'SM1',
    section: 'Второе мнение',
    name: 'Второе мнение по диагнозу',
    description: 'Анализ истории и заключений других врачей',
    priceRUB: undefined,
    duration: '30–40 мин',
  },
];

// Какие коды услуг доступны конкретным врачам (по email/идентификатору)
export const doctorServicesMap: Record<string, string[]> = {
  // пример: используйте реальные e-mail или id врачей
  'doctor@example.com': ['OC1', 'OC2', 'OC3'],
  'cardio@example.com': ['SM1'],
};
