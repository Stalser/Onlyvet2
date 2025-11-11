
'use client';

import { useEffect, useState } from 'react';
import Stars from '@/components/Stars';
import ReviewFullModal from '@/components/ReviewFullModal';

type Review = { id?: string; name: string; pet?: string; rating: number; text: string; photo?: string; createdAt?: string };

export const metadata = { title: 'Отзывы — OnlyVet' };

export default function ReviewsPage() {
  const [items, setItems] = useState<Review[]>([]);
  const [full, setFull] = useState<Review | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/reviews');
        const payload = res.ok ? payload : { items: [] };
        const fromApi: Review[] = (payload.items || []).map((r: any) => ({
          id: r.id, name: r.name, pet: full?.pet, rating: r.rating, text: r.text, photo: r.photo, createdAt: r.created_at
        }));
        const local: Review[] = JSON.parse(localStorage.getItem('onlyvet:reviews') || '[]');
        setItems([...local, ...fromApi]);
      } catch {
        setItems([]);
      }
    })();
  }, []);

  return (
    <section className="container py-16">
      <h1 className="text-3xl mt-2 mb-6 font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-montserrat)' }}>
        Все отзывы
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r) => (
          <article key={r.id ?? r.name} className="bg-white rounded-2xl shadow-soft p-6 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{r.name}</div>
              <div><Stars rating={r.rating} /></div>
            </div>
            {r.photo ? <img src={r.photo} alt={full?.pet || ''} className="w-full h-44 object-cover rounded-xl mb-3" /> : null}
            <p className="text-gray-800 leading-7 whitespace-pre-wrap">{r.text}</p>
          </article>
        ))}
      </div>

      {full && (
        <ReviewFullModal
          name={full.name}
          pet={full?.pet}
          rating={full.rating}
          text={full.text}
          photo={full.photo}
          onClose={() => setFull(null)}
        />
      )}
    </section>
  );
}
