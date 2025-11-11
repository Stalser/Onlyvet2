// components/Services.tsx
'use client';

import Link from 'next/link';
import { services } from '@/components/servicesData';

const LIMIT = 6;

export default function Services() {
  const list = services.slice(0, LIMIT);
  const count = services.length;
  const countLabel = count > 99 ? '99+' : String(count);

  return (
    <section className="container py-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--navy)' }}>
          Услуги
        </h2>
        <Link href="/services" className="btn bg-white border border-gray-300 rounded-xl px-4">
          Все услуги ({countLabel})
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(s => (
          <article key={s.slug} className="card flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[var(--cloud)] flex items-center justify-center text-lg">
                {s.emoji}
              </div>
              <div className="font-semibold" style={{ color: 'var(--navy)' }}>{s.name}</div>
            </div>
            <p className="text-sm opacity-90 flex-1">{s.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm font-semibold">{s.price}</div>
              {s.duration ? <div className="text-xs opacity-70">{s.duration}</div> : <span />}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
