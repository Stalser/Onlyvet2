// app/docs/page.tsx
import Link from 'next/link';

type Doc = { title: string; href: string; note?: string; available?: boolean };
type Group = { title: string; items: Doc[] };

const groups: Group[] = [
  { title: 'Юридические документы', items: [
    { title: 'Публичная оферта', href: '/docs/offer.pdf', available: false, note: 'PDF будет загружен позже' },
    { title: 'Политика конфиденциальности', href: '/docs/privacy.pdf', available: false },
  ]},
  { title: 'Образцы договоров и согласий', items: [
    { title: 'Договор на оказание услуг', href: '/docs/contract.pdf', available: false },
    { title: 'Информированное согласие', href: '/docs/consent.pdf', available: false },
  ]},
  { title: 'Инструкции сервиса (PDF)', items: [
    { title: 'Как записаться и оплатить', href: '/docs/howto-book-pay.pdf', available: false },
    { title: 'Подготовка к онлайн‑приёму', href: '/docs/howto-prepare.pdf', available: false },
  ]},
];

export const metadata = { title: 'Документы — OnlyVet' };

export default function DocsPage(){
  return (
    <section className="container py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-6" style={{color:'var(--navy)'}}>Документы</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {groups.map((g, gi) => (
          <div key={gi} className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="text-xl font-semibold mb-3" style={{color:'var(--navy)'}}>{g.title}</h2>
            <ul className="space-y-2">
              {g.items.map((d, di) => (
                <li key={di} className="flex items-center justify-between gap-3">
                  <div>
                    <div className="font-medium">{d.title}</div>
                    {d.note && <div className="text-xs opacity-70">{d.note}</div>}
                  </div>
                  {d.available
                    ? <Link href={d.href} className="btn bg-white border border-gray-300 rounded-xl px-3">Скачать</Link>
                    : <span className="text-xs opacity-60">скоро</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 text-sm opacity-70">Если нужен документ срочно — напишите нам через форму связи.</div>
    </section>
  );
}
