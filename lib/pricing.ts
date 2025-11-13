// lib/pricing.ts

export type PriceItem = {
  id: string;      // внутренний ID
  code: string;    // код услуги, по нему маппятся врачи
  name: string;    // человекочитаемое название
  price: number;   // цена в рублях
};

/**
 * Общий список услуг и цен.
 */
export const servicesPricing: PriceItem[] = [
  {
    id: 'consult_online',
    code: 'consult_online',
    name: 'Онлайн-консультация',
    price: 1500,
  },
  {
    id: 'consult_followup',
    code: 'consult_followup',
    name: 'Повторная консультация',
    price: 1000,
  },
  {
    id: 'consult_second_opinion',
    code: 'consult_second_opinion',
    name: 'Второе мнение',
    price: 2000,
  },
];

/**
 * Карта "ключ врача → коды услуг".
 * В DoctorCard используется doctor.email, поэтому можно в будущем
 * добавить реальные email-ключи. Сейчас оставляем по id врача.
 */
export const doctorServicesMap: Record<string, string[]> = {
  // по id врача
  '1': ['consult_online', 'consult_followup', 'consult_second_opinion'],
  // можно будет добавить по email, например:
  // 'ivanov@onlyvet.com': ['consult_online', 'consult_followup'],
};

/**
 * Возвращаем список прайсов для конкретного врача по его id.
 */
export function getDoctorPricing(doctorId: string): PriceItem[] {
  const codes = doctorServicesMap[doctorId];
  if (!codes) {
    return servicesPricing;
  }
  return servicesPricing.filter((s) => codes.includes(s.code));
}
