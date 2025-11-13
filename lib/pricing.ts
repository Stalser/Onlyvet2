// lib/pricing.ts

export type PriceItem = {
  id: string;       // внутренний ID
  code: string;     // код услуги, по нему маппимся в картах
  name: string;     // название услуги
  priceRUB?: number; // цена в рублях (как ожидает DoctorCard)
};

/**
 * Общий список услуг и цен.
 */
export const servicesPricing: PriceItem[] = [
  {
    id: 'consult_online',
    code: 'consult_online',
    name: 'Онлайн-консультация',
    priceRUB: 1500,
  },
  {
    id: 'consult_followup',
    code: 'consult_followup',
    name: 'Повторная консультация',
    priceRUB: 1000,
  },
  {
    id: 'consult_second_opinion',
    code: 'consult_second_opinion',
    name: 'Второе мнение',
    priceRUB: 2000,
  },
];

/**
 * Карта "ключ врача → коды услуг".
 * Сейчас используем id врача, в DoctorCard — doctor.email.
 * Позже можно будет расширить карту под реальные данные.
 */
export const doctorServicesMap: Record<string, string[]> = {
  // по id врача
  '1': ['consult_online', 'consult_followup', 'consult_second_opinion'],
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
