// app/services/page.tsx
'use client';

import { doctors } from '../../lib/data';
import { getDoctorPricing } from '../../lib/pricing';

export default function ServicesPage() {
  const doctor = doctors[0];
  const pricing = getDoctorPricing(doctor.id);

  return (
    <div className="container py-12 space-y-4">
      <h1 className="text-2xl font-semibold mb-2">Услуги и цены</h1>
      <p className="text-sm text-gray-600">
        Ниже пример базовых услуг для врача {doctor.name}. Позже здесь можно будет
        вывести реальные данные из БД.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <ul className="space-y-2 text-sm text-gray-800">
          {pricing.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between border-b last:border-b-0 border-gray-100 pb-2 last:pb-0"
            >
              <span>{item.name}</span>
              <span className="text-xs text-gray-500">{item.price} ₽</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
