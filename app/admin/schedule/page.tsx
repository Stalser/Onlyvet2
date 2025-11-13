// app/admin/schedule/page.tsx
import { doctors } from '@/lib/data';
import { doctorSlots } from '@/lib/doctorSchedule';

export const metadata = { title: 'Расписание (админ) — OnlyVet' };

export default function AdminSchedulePage() {
  const byDoctor: Record<string, typeof doctorSlots> = {};
  for (const slot of doctorSlots) {
    if (!byDoctor[slot.doctorEmail]) byDoctor[slot.doctorEmail] = [];
    byDoctor[slot.doctorEmail].push(slot);
  }

  const doctorByEmail = new Map(doctors.map((d) => [d.email, d]));

  return (
    <section className="container py-12 sm:py-16">
      <h1
        className="text-2xl font-semibold mb-4"
        style={{ color: 'var(--navy)' }}
      >
        Расписание онлайн-слотов (админ)
      </h1>
      <p className="text-sm opacity-80 mb-6 max-w-2xl">
        Ниже показаны слоты, сгенерированные в <code>lib/doctorSchedule.ts</code>.
        Страница предназначена для администратора, чтобы видеть, какие интервалы
        доступны для записи у каждого врача. Управление слотами и интеграция с Vetmanager
        можно будет добавить на основе этой страницы.
      </p>

      {Object.keys(byDoctor).length === 0 && (
        <div className="text-sm opacity-70">Слотов пока нет.</div>
      )}

      <div className="space-y-8">
        {Object.entries(byDoctor).map(([email, slots]) => {
          const doctor = doctorByEmail.get(email);
          const title =
            doctor?.name
              ? `${doctor.name} · ${doctor.specialty || ''}`
              : email;

          const sorted = [...slots].sort(
            (a, b) =>
              new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
          );

          return (
            <section key={email}>
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--navy)' }}
              >
                {title}
              </h2>
              <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-[var(--cloud)]/60">
                      <th className="text-left px-3 py-2">Дата</th>
                      <th className="text-left px-3 py-2">Начало</th>
                      <th className="text-left px-3 py-2">Окончание</th>
                      <th className="text-left px-3 py-2">ID слота</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sorted.map((slot) => {
                      const start = new Date(slot.startsAt);
                      const end = new Date(slot.endsAt);
                      return (
                        <tr
                          key={slot.id}
                          className="border-b border-gray-200 last:border-b-0"
                        >
                          <td className="px-3 py-2">
                            {start.toLocaleDateString('ru-RU', {
                              weekday: 'short',
                              day: '2-digit',
                              month: '2-digit',
                            })}
                          </td>
                          <td className="px-3 py-2">
                            {start.toLocaleTimeString('ru-RU', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="px-3 py-2">
                            {end.toLocaleTimeString('ru-RU', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="px-3 py-2 text-xs opacity-60">
                            {slot.id}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
