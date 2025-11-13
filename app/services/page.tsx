// app/services/page.tsx
import Link from 'next/link';

type Service = {
  code: string;
  section: string;
  name: string;
  description: string;
  price?: string;
  duration?: string;
};

const services: Service[] = [
  { code:'OC1', section:'Онлайн-консультации', name:'Первичная онлайн-консультация', description:'Видеозвонок/чат, один пациент', price:'', duration:'30 мин' },
  { code:'OC2', section:'Онлайн-консультации', name:'Повторная консультация', description:'С тем же врачом по текущему случаю', price:'', duration:'20 мин' },
  { code:'OC3', section:'Онлайн-консультации', name:'Разбор анализов', description:'Интерпретация загруженных результатов', price:'', duration:'20–30 мин' },
  { code:'TH1', section:'Терапия', name:'Консультация терапевта', description:'Общий терапевтический приём', price:'', duration:'30–40 мин' },
  { code:'SM1', section:'Второе мнение', name:'Второе мнение по диагнозу', description:'Анализ истории и заключений других врачей', price:'', duration:'30–40 мин' },
];

const sections = Array.from(new Set(services.map(s=>s.section)));

export const metadata = { title: 'Услуги и цены — OnlyVet' };

export default function ServicesPage(){
  return (
    <section className="container py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-2" style={{color:'var(--navy)'}}>Услуги и цены</h1>
      <p className="opacity-80 mb-6 max-w-2xl text-sm sm:text-base">
        Здесь представлены основные онлайн-услуги OnlyVet. Фактические цены и перечень услуг могут отличаться.
        Подробную информацию уточняйте у администратора.
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
              {services.filter(s=>s.section===sec).map(s=>(
                <article key={s.code} className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-base sm:text-lg" style={{color:'var(--navy)'}}>{s.name}</h3>
                      <span className="text-xs opacity-60">{s.code}</span>
                    </div>
                    <p className="text-sm opacity-80 mb-2">{s.description}</p>
                    <div className="text-sm opacity-70">
                      {s.duration && <div><span className="opacity-60">Длительность: </span>{s.duration}</div>}
                      {s.price!==undefined && (
                        <div><span className="opacity-60">Цена: </span>{s.price || 'уточняется'}</div>
                      )}
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
