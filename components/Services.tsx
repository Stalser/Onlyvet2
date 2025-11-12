// components/Services.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { services, groups } from '@/components/servicesData';

export default function Services() {
  const [tab, setTab] = useState(groups[0].key);
  const filtered = useMemo(() => services.filter(s => s.category === tab), [tab]);
  const total = services.length;
  const countLabel = total > 99 ? '99+' : String(total);

  return (
    <section className="container py-12 sm:py-16">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2
          className="text-2xl sm:text-3xl font-bold"
          style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--navy)' }}
        >
          Услуги
        </h2>
        <Link
          href="/services"
          className="btn bg-white border border-gray-300 rounded-xl px-3 sm:px-4 text-sm sm:text-base"
        >
          Все услуги ({countLabel})
        </Link>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-2 px-2 sm:mx-0 sm:px-0 mb-4 sm:mb-6">
        {groups.map((g) => (
          <button
            key={g.key}
            className={
              'px-4 py-2 rounded-xl border text-sm whitespace-nowrap ' +
              (tab === g.key
                ? 'bg-[var(--teal)] text-white border-[var(--teal)]'
                : 'bg-white border-gray-200 hover:bg-[var(--cloud)]')
            }
            onClick={() => setTab(g.key)}
            type="button"
          >
            {g.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filtered.map((s) => (
          <article key={s.slug} className="card flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-[var(--cloud)] flex items-center justify-center text-lg">
                {s.icon ?? s.emoji ?? '🐾'}
              </div>
              <div
                className="font-semibold"
                style={{ color: 'var(--navy)' }}
              >
                {s.name}
              </div>
            </div>
            <p className="text-sm opacity-90 flex-1">{s.desc || ''}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm font-semibold">{s.price}</div>
              {s.duration && <div className="text-xs opacity-70">{s.duration}</div>}
            </div>
            <div className="mt-3">
              <Link
                href={`/booking?service=${s.slug}`}
                className="btn btn-secondary w-full"
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
