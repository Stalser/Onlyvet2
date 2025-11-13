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
    code: "OC1",
    section: "Онлайн-консультации",
    name: "Первичная онлайн-консультация",
    description: "Видеозвонок/чат, один пациент",
    priceRUB: 1500,
    duration: "30 мин",
  },
  {
    code: "OC2",
    section: "Онлайн-консультации",
    name: "Повторная консультация",
    description: "С тем же врачом по текущему случаю",
    priceRUB: 1200,
    duration: "20 мин",
  },
  {
    code: "OC3",
    section: "Онлайн-консультации",
    name: "Разбор анализов",
    description: "Интерпретация загруженных результатов",
    priceRUB: 1000,
    duration: "20–30 мин",
  },
  {
    code: "SM1",
    section: "Второе мнение",
    name: "Второе мнение по диагнозу",
    description: "Анализ истории и заключений других специалистов",
    priceRUB: 2000,
    duration: "30–40 мин",
  },
];

// Услуги по врачам (привязка по email)
export const doctorServicesMap: Record<string, string[]> = {
  "ivanova@example.com": ["OC1","OC2","OC3"],
  "petrov@example.com": ["SM1"],
  "sidorova@example.com": ["OC1","OC3"],
};
