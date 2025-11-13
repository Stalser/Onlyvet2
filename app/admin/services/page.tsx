// app/admin/services/page.tsx
import { servicesPricing } from '@/lib/pricing';

export const metadata = { title: 'Услуги (админ) — OnlyVet' };

export default function AdminServicesPage() {
  // Упрощённая версия страницы управления услугами.
  // Здесь мы просто отображаем текущий список услуг из lib/pricing.ts.
  // Логику allowedServices по врачам временно убрали, чтобы не ломать сборку.
  const sections = Array.from(new Set(servicesPricing.map((s) => s.section)));

  return (
    <section className="container py-12 sm:py-16">
      <h1 className="text-2xl font-semibold mb-4" style={{ color: 'var(--navy)' }}>
        Настройки услуг (просмотр)
      </h1>
      <p className="text-sm opacity-80 mb-6 max-w-2xl">
        Здесь отображается текущий список услуг и цен, заданных в файле <code>lib/pricing.ts</code>.
        В дальнейшем эту страницу можно расширить до полноценной админки прайса.
      </p>

      <div className="space-y-8">
        {sections.map((sec) => (
          <section key={sec}>
            <h2 className="text-xl font-semibold mb-3" style={{ color: 'var(--navy)' }}>
              {sec}
            </h2>
            <div className="rounded-2xl border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-[var(--cloud)]/60">
                    <th className="text-left px-3 py-2">Код</th>
                    <th className="text-left px-3 py-2">Услуга</th>
                    <th className="text-left px-3 py-2">Описание</th>
                    <th className="text-left px-3 py-2">Цена (₽)</th>
                    <th className="text-left px-3 py-2">Длительность</th>
                  </tr>
                </thead>
                <tbody>
                  {servicesPricing
                    .filter((s) => s.section === sec)
                    .map((s) => (
                      <tr key={s.code} className="border-b border-gray-200 last:border-b-0">
                        <td className="px-3 py-2">{s.code}</td>
                        <td className="px-3 py-2">{s.name}</td>
                        <td className="px-3 py-2 opacity-80">{s.description}</td>
                        <td className="px-3 py-2">
                          {s.priceRUB !== undefined
                            ? s.priceRUB.toLocaleString('ru-RU')
                            : '—'}
                        </td>
                        <td className="px-3 py-2">{s.duration || '—'}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
