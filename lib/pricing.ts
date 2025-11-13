// lib/pricing.ts

export type PriceItem = {
  id: string;
  name: string;
  price: number;
};

export function getDoctorPricing(doctorId: string): PriceItem[] {
  // Заглушка: одинаковые цены для любого врача
  return [
    { id: 'consult_online', name: 'Онлайн-консультация', price: 1500 },
    { id: 'consult_followup', name: 'Повторная консультация', price: 1000 },
  ];
}
