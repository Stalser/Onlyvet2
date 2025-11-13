// app/admin/services/page.tsx

import { servicesPricing } from '@/lib/pricing';

export const metadata = { title: 'Услуги (админ) — OnlyVet' };

export default function AdminServicesPage() {
  return (
    <div className="container py-12 space-y-4">
      <h1 className="text-2xl font-semibold">Услуги (админ)</h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="py-2">Код</th>
              <th className="py-2">Название</th>
              <th className="py-2 text-right">Цена, ₽</th>
            </tr>
          </thead>
          <tbody>
            {servicesPricing.map((s) => (
              <tr key={s.id} className="border-b last:border-b-0">
                <td className="py-2 pr-4 text-xs text-gray-500">{s.id}</td>
                <td className="py-2">{s.name}</td>
                <td className="py-2 text-right text-gray-700">{s.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
