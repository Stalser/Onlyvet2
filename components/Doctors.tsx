// components/Doctors.tsx
'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { doctors } from '@/lib/data';
import { servicesPricing, doctorServicesMap } from '@/lib/pricing';

type Doctor = (typeof doctors)[number];

function MiniPrice({ doctor }: { doctor: Doctor }){
  const codes = doctorServicesMap[doctor.email] || [];
  const items = servicesPricing.filter((s) => codes.includes(s.code));

  if (!items.length) return null;

  return (
    <div className="rounded-xl bg-[var(--cloud)]/60 p-3 mt-2">
      <div className="text-xs font-semibold mb-1" style={{ color: 'var(--navy)' }}>
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
  );
}

export default function Doctors(){
  const [specialtyFilter, setSpecialtyFilter] = useState<string | 'all'>('all');

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

  return (
    <section className="container py-12 sm:py-16">
      <div className="flex items-end justify-between gap-3 mb-6 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold" style={{ color: 'var(--navy)' }}>
            Врачи OnlyVet
          </h2>
          <p className="opacity-80 text-sm sm:text-base max-w-xl mt-1">
            Выберите врача по специализации. В мини-прайсе указаны основные
            услуги, которые он оказывает.
          </p>
        </div>
        <Link
          href="/services"
          className="btn bg-white border border-gray-300 rounded-xl px-4 text-sm sm:text-base"
        >
          Услуги и цены
        </Link>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 mb-6 flex flex-wrap gap-2">
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
        {filtered.map((doctor) => (
          <article
            key={doctor.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3
                  className="font-semibold text-lg"
                  style={{ color: 'var(--navy)' }}
                >
                  {doctor.name}
                </h3>
                <div className="text-sm opacity-80">{doctor.specialty}</div>
                {doctor.experience && (
                  <div className="text-xs opacity-70">
                    Стаж: {doctor.experience} лет
                  </div>
                )}
              </div>
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
                href={{ pathname: '/booking', query: { doctorEmail: doctor.email } }}
                className="btn btn-primary rounded-xl px-3 text-sm"
              >
                Записаться
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
