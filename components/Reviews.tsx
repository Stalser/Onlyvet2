'use client';
import { useEffect, useMemo, useState } from 'react';
import Stars from '@/components/Stars';
import ReviewModal from '@/components/ReviewModal';

type Review = { name: string; text: string; pet?: string; rating: number; createdAt?: string };

const seed: Review[] = [
  { name: 'Екатерина и кот Мурзик', rating: 5, text: 'За 15 минут разобрались с рвотой, врач спокойно объяснил, что критичного нет и что смотреть дальше. Без поездки в клинику — это было важно.' },
  { name: 'Антон и пес Рич', rating: 5, text: 'Понравилась структура: поддержка → шаги → решение. Через двое суток спросили, как дела, скорректировали дозу — стало лучше.' },
  { name: 'Марина и Луна', rating: 4, text: 'Загрузила анализы, врач разложил всё по пунктам и дал план. Очень аккуратный и спокойный тон, это помогает. Было бы хорошо добавить подбор рациона в пакет.' }
];

export default function Reviews() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Review[]>(seed);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('onlyvet:reviews') || '[]');
    if (local.length) setItems(prev => [...local, ...prev].slice(0, 50));
  }, []);

  const rating = useMemo(() => {
    const sum = items.reduce((a, r) => a + (r.rating || 5), 0);
    const avg = items.length ? Math.round((sum / items.length) * 10) / 10 : 5;
    return { avg, count: items.length };
  }, [items]);

  return (
    <section className="container py-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold" style={{fontFamily:'var(--font-montserrat)'}}>Отзывы</h2>
          <div className="mt-2 text-sm opacity-80 flex items-center gap-2">
            <Stars value={rating.avg} />
            <span>{rating.avg} / 5 · {rating.count} отзыв(ов)</span>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=>setOpen(true)}>Написать отзыв</button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((r, i) => {
          const showAll = expanded[i];
          const short = r.text.length > 180 && !showAll ? r.text.slice(0, 180) + '…' : r.text;
          return (
            <article key={i} className="card">
              <div className="flex items-center justify-between mb-2">
                <div className="text-coral font-semibold">{r.name}</div>
                <Stars value={r.rating} />
              </div>
              <p className="opacity-90 text-sm whitespace-pre-wrap">{short}</p>
              {r.text.length > 180 && (
                <button className="mt-2 text-teal text-sm" onClick={()=>setExpanded(prev=>({ ...prev, [i]: !prev[i] }))}>
                  {showAll ? 'Свернуть' : 'Читать полностью'}
                </button>
              )}
            </article>
          );
        })}
      </div>

      {/* JSON-LD for AggregateRating */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AggregateRating",
          "itemReviewed": { "@type": "Organization", "name": "OnlyVet" },
          "ratingValue": rating.avg,
          "bestRating": 5,
          "ratingCount": rating.count
        }) }}
      />

      {open && <ReviewModal onClose={()=>setOpen(false)} />}
    </section>
  );
}
