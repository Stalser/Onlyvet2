'use client';
import { useState } from 'react';

const faqs = [
  { q: 'Когда онлайн-консультация уместна, а когда — нет?',
    a: 'Если у питомца тяжёлая апатия, судороги, кровотечение, удушье, травма с болью — срочно едьте в клинику. Онлайн полезен в большинстве остальных случаев: первичная оценка, маршрутизация, проверка анализов, контроль лечения.' },
  { q: 'Как быстро врач отвечает?',
    a: 'Среднее ожидание чата — 10–15 минут. Для видео — выбираете ближайший доступный слот. В экстренных случаях мы сразу подскажем алгоритм действий.' },
  { q: 'Сколько стоит и как оплатить?',
    a: 'Чат-консультация — от 900 ₽, видео — от 1500 ₽. Оплата картой на странице оформления (поддерживаем квитанции и возвраты).' },
  { q: 'Что подготовить перед консультацией?',
    a: 'Имя и вес питомца, список симптомов и когда начались, фото/видео, история вакцинации и препаратов. Если есть анализы — приложите их.' },
  { q: 'Назначаете ли вы препараты?',
    a: 'Да, при показаниях и в рамках удалённого формата. При необходимости врач направит в офлайн-клинику для осмотра/процедур.' },
  { q: 'Можно ли получить выписку?',
    a: 'Да. После консультации в Личном кабинете доступна выписка (PDF/печать) с рекомендациями.' },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="container py-16">
      <h2 className="text-3xl font-bold mb-10" style={{fontFamily: 'var(--font-montserrat)'}}>Частые вопросы</h2>
      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="card">
            <button onClick={() => setOpen(open === idx ? null : idx)} className="w-full text-left flex justify-between items-center">
              <span className="font-semibold">{item.q}</span>
              <svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
            </button>
            {open === idx && <p className="opacity-80 mt-3">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
