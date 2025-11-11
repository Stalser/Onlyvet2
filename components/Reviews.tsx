
'use client';

import { useEffect, useState } from 'react';
import Stars from '@/components/Stars';
import ReviewFullModal from '@/components/ReviewFullModal';
import ReviewModal from '@/components/ReviewModal';

type Review = {
  id?: string;
  name: string;
  pet?: string;
  rating: number;
  text: string;
  photo?: string;   // optional URL or data URI
  createdAt?: string;
};

// inline neutral placeholder to avoid broken image icons if no photo provided
const PLACEHOLDER = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500">
    <defs><style>.t{fill:#0e1620;opacity:.3;font-family:Arial,sans-serif;font-size:18px}</style></defs>
    <rect width="100%" height="100%" fill="#eef2f7"/>
    <rect x="24" y="24" width="752" height="452" rx="16" ry="16" fill="#e6edf5"/>
    <text x="50%" y="52%" text-anchor="middle" class="t">Фото владельца</text>
  </svg>
`);

// Seed — чтобы секция всегда была наполненной, даже без API
const SEED: Review[] = [
  {
    name: 'Екатерина и кот Мурзик',
    pet: 'Мурзик',
    rating: 5,
    text: 'У кота началась рвота, мы волновались. Врач попросил описать симптомы и прислать фото лотка — за 15 минут стало понятно, что экстренности нет. Объяснили, когда ехать в клинику, а когда можно наблюдать дома. Очень успокоило.',
  },
  {
    name: 'Антон и пёс Рич',
    pet: 'Рич',
    rating: 5,
    text: 'Сначала поддержали, потом дали чёткий план из трёх шагов. Через двое суток спросили про самочувствие и чуть скорректировали дозу — стало заметно лучше.',
  },
  {
    name: 'Марина и Луна',
    pet: 'Луна',
    rating: 4,
    text: 'Длинный отзыв: у собаки хронические проблемы с кожей, попасть к дерматологу офлайн не получалось. Попробовали онлайн — заранее собрали фото, список препаратов и результаты анализов за полгода. Врач подробно разобрал каждую схему, объяснил, что действительно важно, а что можно отложить. Получили понятный план ухода, список «красных флагов» и когда точно ехать в клинику. Через пару недель состояние заметно улучшилось.',
  },
  {
    name: 'Сергей и Грета',
    pet: 'Грета',
    rating: 5,
    text: 'Подсказали, как обезболить собаку на выходных и когда нужен рентген. Спасибо!',
  },
  {
    name: 'Ирина и Миша',
    pet: 'Миша',
    rating: 5,
    text: 'Ночью поднялась температура. Помогли оценить состояние и правильно доехать в клинику утром.',
  },
  {
    name: 'Ольга и Мышь',
    pet: 'джунгарик',
    rating: 4,
    text: 'Даже с хомячком всё объяснили: что смотреть, чем помочь, когда срочно к врачу.',
  },
];

export default function Reviews() {
  const [items, setItems] = useState<Review[]>(SEED);
  const [full, setFull] = useState<Review | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Подмешиваем локальные отзывы и из API
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/reviews');
        const payload = res.ok ? await res.json() : { items: [] };
        const fromApi: Review[] = (payload.items || []).map((r: any) => ({
          id: r.id,
          name: r.name,
          pet: r.pet,
          rating: r.rating,
          text: r.text,
          photo: r.photo,
          createdAt: r.created_at,
        }));
        const local: Review[] = JSON.parse(localStorage.getItem('onlyvet:reviews') || '[]');
        setItems([ ...local, ...fromApi, ...SEED ]);
      } catch {
        setItems(SEED);
      }
    })();
  }, []);

  return (
    <section className="container py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-montserrat)' }}>
          Отзывы
        </h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>Написать отзыв</button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((r, idx) => {
          const long = r.text.length > 220;
          const preview = long ? r.text.slice(0, 200) + '…' : r.text;
          return (
            <article key={r.id ?? `seed-${idx}`} className="bg-white rounded-2xl shadow-soft p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold" style={{ color: 'var(--navy)' }}>
                  {r.name}
                </div>
                <Stars value={r.rating} />
              </div>

              <div className="w-full h-40 rounded-xl overflow-hidden mb-3" style={{ background: 'var(--cloud)' }}>
                <img
                  src={r.photo || PLACEHOLDER}
                  alt={r.pet || 'Фото владельца'}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-sm text-gray-800 leading-6">{preview}</p>

              {long && (
                <div className="pt-3">
                  <button className="text-teal text-sm" onClick={() => setFull(r)}>
                    Читать полностью
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {showForm && <ReviewModal onClose={() => setShowForm(false)} />}

      {full && (
        <ReviewFullModal
          name={full.name}
          pet={full.pet}
          rating={full.rating}
          text={full.text}
          photo={full.photo || PLACEHOLDER}
          onClose={() => setFull(null)}
        />
      )}
    </section>
  );
}
