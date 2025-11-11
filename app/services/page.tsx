// app/services/page.tsx
import Link from 'next/link';
import { services } from '@/components/servicesData';

export const metadata = { title: 'Услуги — OnlyVet' };

export default function ServicesPage() {
  return (
    <section className="container py-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--navy)' }}>
          Все услуги
        </h1>
        <Link href="/booking" className="btn btn-primary">Записаться</Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(s => (
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
            <div className="mt-4">
              <Link href={`/booking?service=${s.slug}`} className="btn btn-secondary">Записаться</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
