// components/Doctors.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { doctors } from '@/lib/data';
import { servicesPricing, doctorServicesMap } from '@/lib/pricing';

type Doctor = (typeof doctors)[number];

const INITIAL_VISIBLE = 3; // сколько врачей показываем до "Показать ещё"

function MiniPrice({ doctor }: { doctor: Doctor }) {
  const codes = doctor.email ? (doctorServicesMap[doctor.email] || []) : [];
  const items = servicesPricing.filter((s) => codes.includes(s.code));

  if (!items.length) return null;

  const mainItems = items.slice(0, 2);
  const extraCount = items.length - mainItems.length;

  return (
    <div className="rounded-xl bg-[var(--cloud)]/60 p-3 mt-2">
      <div
        className="text-xs font-semibold mb-1"
        style={{ color: 'var(--navy)' }}
      >
        Услуги врача
      </div>
      <ul className="text-xs space-y-1">
        {mainItems.map((s) => (
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
      {extraCount > 0 && (
        <div className="text-[11px] opacity-70 mt-1">
          + ещё {extraCount} усл{extraCount === 1 ? 'уга' : extraCount < 5 ? 'уги' : 'уг'}
        </div>
      )}
    </div>
  );
}

export default function Doctors() {
  const [specialtyFilter, setSpecialtyFilter] = useState<string | 'all'>('all');
  const [showAll, setShowAll] = useState(false);

  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialty))),
    []
  );

  const filtered = useMemo(
    () =>
      specialtyFilter === 'all'
        ? doctors
        : doctors.filter((d) => d.specialty === specialtyFilter),
    [specialtyFilter]
  );

  const total = filtered.length;
  const visibleDoctors = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hiddenCount = total - visibleDoctors.length;

  return (
    <section className="container py-12 sm:py-16">
      <div className="flex items-end justify-between gap-3 mb-6 flex-wrap">
        <div>
          <h2
            className="text-3xl font-bold"
            style={{ color: 'var(--navy)' }}
          >
            Врачи OnlyVet
          </h2>
          <p className="opacity-80 text-sm sm:text-base max-w-xl mt-1">
            Онлайн-консультации проводят практикующие врачи с опытом работы в
            клинике. Выберите специалиста под задачу вашего питомца.
          </p>
        </div>
        <Link
          href="/services"
          className="btn bg-white border border-gray-300 rounded-xl px-4 text-sm sm:text-base"
        >
          Услуги и цены
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-3 mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setSpecialtyFilter('all')}
          className={`text-xs sm:text-sm px-3 py-1 rounded-full border ${
            specialtyFilter === 'all'
              ? 'bg-[var(--teal)] text-white border-[var(--teal)]'
              : 'bg-[var(--cloud)] hover:bg-white'
          }`}
        >
          Все специальности
        </button>
        {specialties.map((sp) => (
          <button
            key={sp}
            onClick={() => setSpecialtyFilter(sp)}
            className={`text-xs sm:text-sm px-3 py-1 rounded-full border ${
              specialtyFilter === sp
                ? 'bg-[var(--teal)] text-white border-[var(--teal)]'
                : 'bg-[var(--cloud)] hover:bg-white'
          }`}
          >
            {sp}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleDoctors.map((doctor) => {
          const rating =
            (doctor as any).rating !== undefined ? (doctor as any).rating : 4.9;
          const consultations =
            (doctor as any).consultations !== undefined
              ? (doctor as any).consultations
              : 120;

          return (
            <article
              key={doctor.id}
              className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-[var(--cloud)] flex items-center justify-center">
                    {doctor.photo ? (
                      <Image
                        src={doctor.photo}
                        alt={doctor.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xl opacity-50">
                        {doctor.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-lg"
                      style={{ color: 'var(--navy)' }}
                    >
                      {doctor.name}
                    </h3>
                    <div className="text-sm opacity-80">
                      {doctor.specialty}
                    </div>
                    {doctor.experience && (
                      <div className="text-xs opacity-70">
                        Стаж: {doctor.experience} лет
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs opacity-80 mt-1">
                <span>⭐ {rating.toFixed(1)}</span>
                <span className="opacity-60">
                  · {consultations}+ онлайн-консультаций
                </span>
              </div>

              <MiniPrice doctor={doctor} />

              <div className="flex justify-end gap-2 mt-2">
                <Link
                  href={`/doctors/${doctor.id}`}
                  className="btn bg-white border border-gray-300 rounded-xl px-3 text-sm"
                >
                  Подробнее
                </Link>
                <Link
                  href={{
                    pathname: '/booking',
                    query: { doctorEmail: doctor.email },
                  }}
                  className="btn btn-primary rounded-xl px-3 text-sm"
                >
                  Записаться
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {total > INITIAL_VISIBLE && (
        <div className="mt-6 flex justify-center">
          <button
            className="text-sm px-4 py-2 rounded-full border bg-white hover:bg-[var(--cloud)]"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll
              ? 'Свернуть список врачей'
              : `Показать ещё ${hiddenCount} врач${
                  hiddenCount === 1
                    ? 'а'
                    : hiddenCount < 5
                    ? 'ей'
                    : 'ей'
                }`}
          </button>
        </div>
      )}
    </section>
  );
}
