// app/services/page.tsx
import Link from 'next/link';
import { servicesPricing } from '@/lib/pricing';

export const metadata = { title: 'Услуги и цены — OnlyVet' };

export default function ServicesPage(){
  const sections = Array.from(new Set(servicesPricing.map(s=>s.section)));
  return (
    <section className="container py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-2" style={{color:'var(--navy)'}}>Услуги и цены</h1>
      <p className="opacity-80 mb-6 max-w-2xl text-sm sm:text-base">
        Здесь представлен текущий перечень онлайн-услуг OnlyVet. Цены и список услуг вы можете оперативно обновлять в одном месте — в файле <code>lib/pricing.ts</code>.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 mb-6 flex flex-wrap gap-2">
        {sections.map(sec=>(
          <a key={sec} href={`#${sec}`} className="text-xs sm:text-sm px-3 py-1 rounded-full border bg-[var(--cloud)] hover:bg-white">
            {sec}
          </a>
        ))}
      </div>

      <div className="space-y-8">
        {sections.map(sec=> (
          <section key={sec} id={sec}>
            <h2 className="text-2xl font-semibold mb-3" style={{color:'var(--navy)'}}>{sec}</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {servicesPricing.filter(s=>s.section===sec).map(s=>(
                <article key={s.code} className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-base sm:text-lg" style={{color:'var(--navy)'}}>{s.name}</h3>
                      <span className="text-xs opacity-60">{s.code}</span>
                    </div>
                    <p className="text-sm opacity-80 mb-2">{s.description}</p>
                    <div className="text-sm opacity-70 space-y-1">
                      {s.duration && (
                        <div><span className="opacity-60">Длительность: </span>{s.duration}</div>
                      )}
                      <div>
                        <span className="opacity-60">Цена: </span>
                        {s.priceRUB !== undefined ? `${s.priceRUB.toLocaleString('ru-RU')} ₽` : 'уточняется'}
                      </div>
                      {s.note && <div className="opacity-70 text-xs">{s.note}</div>}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <Link href="/booking" className="btn btn-primary rounded-xl px-4 text-sm">Записаться</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
