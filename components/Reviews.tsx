'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Stars from '@/components/Stars';
import ReviewModal from '@/components/ReviewModal';
import ReviewFullModal from '@/components/ReviewFullModal';

type Review = { id?: string; name: string; text: string; pet?: string; rating: number; createdAt?: string; photo?: string };

export default function Reviews() {
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState<Review | null>(null);
  const [items, setItems] = useState<Review[]>([]);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/reviews');
        const data = await res.json();
        const server: Review[] = (data.items || []).map((r:any)=>({ id: r.id, name: r.name, pet: r.pet || undefined, rating: r.rating, text: r.text, createdAt: r.created_at }));
        const local = JSON.parse(localStorage.getItem('onlyvet:reviews') || '[]');
        setItems([ ...local, ...server ]);
      } catch {}
    }
    load();
  }, []);

  const rating = useMemo(() => {
    if (!items.length) return { avg: 5, count: 0 };
    const sum = items.reduce((a, r) => a + (r.rating || 5), 0);
    const avg = Math.round((sum / items.length) * 10) / 10;
    return { avg, count: items.length };
  }, [items]);

  function scrollByCards(dir: 'left'|'right') {
    const el = container.current;
    if (!el) return;
    const card = el.querySelector('article') as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  }

  return (
    <section className="container py-16">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold" style={{fontFamily:'var(--font-montserrat)'}}>Отзывы</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn bg-white border border-gray-200 rounded-xl px-4 py-2 hover:bg-cloud" onClick={()=>scrollByCards('left')} aria-label="Назад">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
          </button>
          <button className="btn btn-secondary" onClick={()=>scrollByCards('right')} aria-label="Вперёд">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
          </button>
          <button className="btn btn-primary ml-2" onClick={()=>setOpen(true)}>Написать отзыв</button>
        </div>
      </div>

      {/* скрытая лента: горизонтальный скролл без полосы */}
      <div ref={container} className="flex gap-6 overflow-x-auto pb-2" style={{scrollbarWidth:'none'} as any}>
        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
        {items.map((r, i) => {
          const long = (r.text || '').length > 200;
          const short = long ? r.text.slice(0, 200) + '…' : r.text;
          return (
            <article key={i} className="card min-w-[280px] max-w-[320px]">
              <div className="flex items-center justify-between mb-2">
                <div className="text-coral font-semibold">{r.name}</div>
                <Stars value={r.rating} />
              </div>
              <p className="opacity-90 text-sm whitespace-pre-wrap">{short}</p>
              <div className="mt-2 flex justify-between items-center">
                {long ? <button className="text-teal text-sm" onClick={()=>setFull(r)}>Читать полностью</button> : <span />}
              </div>
            </article>
          );
        })}
      </div>

      {/* JSON-LD для агрегированного рейтинга */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AggregateRating",
          "itemReviewed": { "@type": "Organization", "name": "OnlyVet" },
          "ratingValue": rating.avg || 5,
          "bestRating": 5,
          "ratingCount": rating.count || 0
        }) }}
      />

      {open && <ReviewModal onClose={()=>setOpen(false)} />}
      {full && <ReviewFullModal name={full.name} text={full.text} rating={full.rating} pet={full.pet} photo={full.photo} onClose={()=>setFull(null)} />}
    </section>
  );
}
