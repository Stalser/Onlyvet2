// lib/pricing.ts

export type PriceItem = {
  id: string;
  name: string;
  price: number;
};

/**
 * Общий список услуг и цен, который можно использовать и в публичной части,
 * и в админке, и в карточках врачей.
 */
export const servicesPricing: PriceItem[] = [
  { id: 'consult_online', name: 'Онлайн-консультация', price: 1500 },
  { id: 'consult_followup', name: 'Повторная консультация', price: 1000 },
  { id: 'consult_second_opinion', name: 'Второе мнение', price: 2000 }
];

/**
 * Карта "врач → набор услуг".
 * Пока заглушка: всем врачам выдаём один и тот же список servicesPricing.
 */
export const doctorServicesMap: Record<string, PriceItem[]> = {
  '1': servicesPricing
};

/**
 * Функция, которую используют страницы врача/услуг.
 */
export function getDoctorPricing(doctorId: string): PriceItem[] {
  return doctorServicesMap[doctorId] ?? servicesPricing;
}
