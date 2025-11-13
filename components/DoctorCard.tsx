// components/DoctorCard.tsx
import { servicesPricing, doctorServicesMap } from '@/lib/pricing';

type Doctor = {
  id: string;
  name: string;
  email: string;
  specialty: string;
  // добавьте сюда остальные нужные поля (фото, стаж и т.д.)
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  const codes = doctorServicesMap[doctor.email] || [];
  const items = servicesPricing.filter((s) => codes.includes(s.code));

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="font-semibold text-lg" style={{ color: 'var(--navy)' }}>
            {doctor.name}
          </h3>
          <div className="text-sm opacity-80">{doctor.specialty}</div>
        </div>
        {/* Здесь можно добавить фото врача */}
      </div>

      {/* Мини-прайс врача */}
      {items.length > 0 && (
        <div className="rounded-xl bg-[var(--cloud)]/60 p-3">
          <div
            className="text-xs font-semibold mb-1"
            style={{ color: 'var(--navy)' }}
          >
            Услуги врача
          </div>
          <ul className="text-xs space-y-1">
            {items.map((s) => (
              <li key={s.code} className="flex justify-between gap-2">
                <span className="opacity-80">{s.name}</span>
                <span className="font-semibold">
                  {s.priceRUB !== undefined
                    ? `${s.priceRUB.toLocaleString('ru-RU')} ₽`
                    : 'уточняется'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-end gap-2 mt-2">
        <button className="btn bg-white border border-gray-300 rounded-xl px-3 text-sm">
          Подробнее
        </button>
        <button className="btn btn-primary rounded-xl px-3 text-sm">
          Записаться
        </button>
      </div>
    </article>
  );
}
