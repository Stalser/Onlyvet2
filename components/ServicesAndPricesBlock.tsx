// components/ServicesAndPricesBlock.tsx
import Link from 'next/link';

type Item = { title: string; subtitle: string };

const items: Item[] = [
  { title:'Онлайн-консультации', subtitle:'Первичная и повторная консультация врача онлайн' },
  { title:'Второе мнение', subtitle:'Анализ сложных случаев и заключений других специалистов' },
  { title:'Разбор анализов', subtitle:'Интерпретация результатов исследований' },
];

export default function ServicesAndPricesBlock(){
  return (
    <section className="container py-12 sm:py-16">
      <div className="flex items-end justify-between gap-3 mb-6 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold" style={{color:'var(--navy)'}}>Услуги и цены</h2>
          <p className="opacity-80 text-sm sm:text-base max-w-xl mt-1">Краткий обзор основных направлений. Полный перечень услуг и актуальные цены смотрите на отдельной странице.</p>
        </div>
        <Link href="/services" className="btn bg-white border border-gray-300 rounded-xl px-4 text-sm sm:text-base">Все услуги и цены</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((it, idx)=>(
          <article key={idx} className="rounded-2xl border border-gray-200 bg-white p-4">
            <h3 className="font-semibold text-lg mb-1" style={{color:'var(--navy)'}}>{it.title}</h3>
            <p className="opacity-80 text-sm">{it.subtitle}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
