// components/Reviews.tsx
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Stars from '@/components/Stars';
import ReviewModal from '@/components/ReviewModal';
import ReviewFullModal from '@/components/ReviewFullModal';

type Review = {
  id?: string;
  name: string;
  pet?: string;
  rating: number;
  text: string;
  photo?: string;
  photos?: string[];
  createdAt?: string;
};

const FALLBACK_IMG =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <rect width="100%" height="100%" fill="#eef2f7"/>
      <text x="50%" y="52%" text-anchor="middle" font-family="Arial" font-size="18" fill="#9aa7b0">Фото</text>
    </svg>`
  );

const SEED: Review[] = [
  { name: 'Екатерина и кот Мурзик', pet: 'Мурзик', rating: 5, photo: '/reviews/murzik.jpg',
    text: 'У кота началась рвота, переживали. Врач попросил описать симптомы и прислать фото лотка, за 15 минут разобрались, что критичного нет. Объяснили, когда ехать в клинику, а когда достаточно наблюдать.' },
  { name: 'Антон и пёс Рич', pet: 'Рич', rating: 5, photo: '/reviews/rich.jpg',
    text: 'Сначала поддержали, потом дали чёткий план из трёх шагов. Через двое суток уточнили самочувствие — стало лучше.' },
  { name: 'Марина и Луна', pet: 'Луна', rating: 4, photo: '/reviews/luna.jpg',
    text: 'Длинный отзыв: хроническая дерматология... Понятный план ухода, список «красных флагов». Через пару недель состояние заметно улучшилось.' },
];

export default function Reviews() {
  const [items, setItems] = useState<Review[]>(SEED);
  const [full, setFull] = useState<Review | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // decide layout on client (чтобы точно отрисовать десктопную сетку)
  useEffect(() => {
    const check = () => setIsDesktop(typeof window !== 'undefined' && window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check, { passive: true } as any);
    return () => window.removeEventListener('resize', check as any);
  }, []);

  // load
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/reviews');
        const payload = res.ok ? await res.json() : { items: [] };
        const fromApi: Review[] = (payload.items || []).map((r: any) => ({
          id: r.id, name: r.name, pet: r.pet, rating: r.rating, text: r.text, photo: r.photo, photos: r.photos, createdAt: r.created_at
        }));
        const local: Review[] = JSON.parse(localStorage.getItem('onlyvet:reviews') || '[]');
        setItems([...local, ...fromApi, ...SEED]);
      } catch {
        setItems(SEED);
      }
    })();
  }, []);

  const avg = useMemo(() => {
    if (!items.length) return 5;
    const sum = items.reduce((acc, r) => acc + (r.rating || 5), 0);
    return Math.round((sum / items.length) * 10) / 10;
  }, [items]);

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.currentTarget as HTMLImageElement).src = FALLBACK_IMG;
  };

  const Header = () => (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-montserrat)' }}>
          Отзывы
        </h2>
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <span className="font-semibold" style={{ color: 'var(--navy)' }}>{avg}</span>
          <span className="text-xs">/ 5</span>
          <span className="ml-2"><Stars value={avg} /></span>
          <span className="ml-2 opacity-80">· {items.length}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/reviews" className="btn bg-white border border-gray-300 rounded-xl px-3 sm:px-4">Смотреть все</Link>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>Написать отзыв</button>
      </div>
    </div>
  );

  const Card = ({ r }: { r: Review }) => {
    const text = r.text || '';
    const long = text.length > 220;
    const preview = long ? text.slice(0, 200) + '…' : text;
    return (
      <article className="bg-white rounded-2xl shadow-soft p-5 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="font-semibold" style={{ color: 'var(--navy)' }}>{r.name}</div>
          <div className="ml-2"><Stars value={r.rating} /></div>
        </div>
        <div className="mt-3 w-full h-36 rounded-xl overflow-hidden" style={{ background: 'var(--cloud)' }}>
          <img src={r.photo || FALLBACK_IMG} onError={onImgError} alt={r.pet ? `Фото ${r.pet}` : 'Фото питомца'} className="w-full h-full object-cover" />
        </div>
        <p className="mt-3 text-sm text-gray-800 leading-6">{preview}</p>
        {long && <button className="text-teal text-sm mt-2" onClick={() => setFull(r)}>Читать полностью</button>}
      </article>
    );
  };

  // mobile carousel
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const onScroll = () => {
    if (!trackRef.current) return;
    const el = trackRef.current;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };
  const scroll = (dir: 'left' | 'right') => {
    if (!trackRef.current) return;
    const step = 320;
    trackRef.current.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  };

  return (
    <section className="container py-12 sm:py-16">
      <Header />

      {isDesktop ? (
        // строгая десктопная сетка
        <div className="grid grid-cols-3 gap-6">
          {items.slice(0, 9).map((r, i) => <Card key={r.id ?? `desk-${i}`} r={r} />)}
        </div>
      ) : (
        // мобильная лента со стрелками
        <>
          <div className="mb-3 flex items-center gap-2">
            <button className={`btn ${canPrev ? 'bg-white border border-gray-300' : 'opacity-40 cursor-not-allowed'} rounded-xl px-3 sm:px-4`}
              onClick={() => canPrev && scroll('left')} aria-label="Предыдущие">‹</button>
            <button className={`btn btn-secondary ${!canNext ? 'opacity-40 cursor-not-allowed' : ''}`}
              onClick={() => canNext && scroll('right')} aria-label="Следующие">›</button>
          </div>
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="no-scrollbar flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory -mx-2 px-2 sm:mx-0 sm:px-0"
            style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
          >
            {items.map((r, i) => (
              <div key={r.id ?? `mob-${i}`} className="snap-start min-w-[320px] max-w-[320px]">
                <Card r={r} />
              </div>
            ))}
          </div>
        </>
      )}

      {full && <ReviewFullModal review={full} onClose={() => setFull(null)} />}
      {showForm && <ReviewModal onClose={() => setShowForm(false)} />}
    </section>
  );
}
