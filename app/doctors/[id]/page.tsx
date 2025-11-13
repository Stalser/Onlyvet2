// app/doctors/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { doctors } from '@/lib/data';
import { servicesPricing, doctorServicesMap } from '@/lib/pricing';
import { doctorSlots } from '@/lib/doctorSchedule';

type Doctor = (typeof doctors)[number];

export default function DoctorPage() {
  const params = useParams();
  const router = useRouter();

  const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';
  const doctor: Doctor | undefined = doctors.find((d) => String(d.id) === String(id));

  if (!doctor) {
    return (
      <section className="container py-12 sm:py-16">
        <h1
          className="text-2xl font-semibold mb-4"
          style={{ color: 'var(--navy)' }}
        >
          Врач не найден
        </h1>
        <button
          className="btn bg-white border border-gray-300 rounded-xl px-4"
          onClick={() => router.back()}
        >
          Назад
        </button>
      </section>
    );
  }

  const codes = doctorServicesMap[doctor.email] || [];
  const items = servicesPricing.filter((s) => codes.includes(s.code));

  const upcomingSlots = doctorSlots
    .filter((slot) => slot.doctorEmail === doctor.email)
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    )
    .slice(0, 3);

  return (
    <section className="container py-12 sm:py-16">
      <button
        className="text-sm opacity-70 hover:opacity-100 mb-4"
        onClick={() => router.back()}
      >
        ← Назад
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border bg-white border-gray-200 p-4 sm:p-6 flex gap-4 items-center">
            {doctor.photo && (
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--cloud)] shrink-0">
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1
                className="text-2xl sm:text-3xl font-bold mb-1"
                style={{ color: 'var(--navy)' }}
              >
                {doctor.name}
              </h1>
              <div className="text-sm opacity-80">{doctor.specialty}</div>
              {doctor.experience && (
                <div className="text-sm opacity-70 mt-1">
                  Стаж: {doctor.experience} лет
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border bg-white border-gray-200 p-4 sm:p-6">
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--navy)' }}
            >
              О враче
            </h2>
            <p className="text-sm opacity-80">
              {doctor.bio || 'Описание врача появится позже.'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border bg-white border-gray-200 p-4 sm:p-5">
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--navy)' }}
            >
              Услуги врача
            </h2>
            {items.length === 0 ? (
              <div className="text-sm opacity-70">
                Услуги для этого врача пока не указаны.
              </div>
            ) : (
              <ul className="text-sm space-y-2">
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
            )}
            <div className="mt-4">
              <Link
                href="/services"
                className="text-xs opacity-70 hover:opacity-100 underline"
              >
                Смотреть все услуги и цены
              </Link>
            </div>
          </div>

          {upcomingSlots.length > 0 && (
            <div className="rounded-2xl border bg-white border-gray-200 p-4 sm:p-5">
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--navy)' }}
              >
                Ближайшие онлайн-слоты
              </h2>
              <ul className="text-sm space-y-2">
                {upcomingSlots.map((slot) => (
                  <li
                    key={slot.id}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="opacity-80">
                      {new Date(slot.startsAt).toLocaleString('ru-RU', {
                        weekday: 'short',
                        day: '2-digit',
                        month: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span className="text-xs opacity-70">
                      до{' '}
                      {new Date(slot.endsAt).toLocaleTimeString('ru-RU', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-xs opacity-70">
                В реальной интеграции слоты приходят из Vetmanager.
              </div>
            </div>
          )}

          <div className="rounded-2xl border bg-white border-gray-200 p-4 sm:p-5">
            <h2
              className="text-lg font-semibold mb-2"
              style={{ color: 'var(--navy)' }}
            >
              Записаться к врачу
            </h2>
            <p className="text-sm opacity-80 mb-3">
              Вы можете выбрать формат консультации (чат/видео) и удобное время.
            </p>
            <Link
              href={{ pathname: '/booking', query: { doctorEmail: doctor.email } }}
              className="btn btn-primary rounded-xl px-4 w-full text-sm sm:text-base text-center block"
            >
              Записаться на онлайн-консультацию
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
