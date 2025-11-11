// app/reviews/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Stars from '@/components/Stars';
import ReviewFullModal, { Review } from '@/components/ReviewFullModal';

export default function ReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [full, setFull] = useState<Review | null>(null);

  const SEED: Review[] = [
    { name:'Екатерина и кот Мурзик', pet:'Мурзик', rating:5, text:'У кота началась рвота... объяснили, когда ехать в клинику, а когда наблюдать дома — это успокоило и сэкономило время.' },
    { name:'Антон и пёс Рич', pet:'Рич', rating:5, text:'Поддержка → структура → план. Через двое суток уточнили самочувствие и скорректировали дозу — стало лучше.' },
    { name:'Марина и Луна', pet:'Луна', rating:4, text:'Длинный отзыв: хроническая дерматология... подробный план ухода, критерии «красных флагов», стало лучше через пару недель.' }
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/reviews');
        const payload = res.ok ? await res.json() : { items: [] as any[] };
        const fromApi: Review[] = (payload.items || []).map((r: any) => ({
          id: r.id,
          name: r.name,
          pet: r.pet,
          rating: r.rating,
          text: r.text,
          photo: r.photo,
          photos: r.photos,
          createdAt: r.created_at
        }));
        setItems(fromApi.length ? fromApi : SEED);
      } catch {
        setItems(SEED);
      }
    })();
  }, []);

  const cover = (r: Review) => (r.photos && r.photos.length ? r.photos[0] : (r.photo || ''));

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-6" style={{ color:'var(--navy)' }}>Все отзывы</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r, i) => (
          <article key={r.id ?? `rev-${i}`} className="bg-white rounded-2xl shadow-soft p-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-[var(--navy)]">{r.name}</div>
              <Stars value={r.rating} />
            </div>
            {cover(r) && (
              <img
                src={cover(r)}
                alt={r.pet || ''}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
            )}
            <p className="text-sm text-gray-800 whitespace-pre-wrap leading-6">{r.text}</p>
            <div className="mt-2">
              <button className="text-teal text-sm" type="button" onClick={() => setFull(r)}>
                Читать полностью
              </button>
            </div>
          </article>
        ))}
      </div>

      {full && (
        <ReviewFullModal
          review={full}
          onClose={() => setFull(null)}
        />
      )}
    </section>
  );
}
