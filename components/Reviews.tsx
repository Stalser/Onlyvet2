'use client';
import { useEffect, useState } from 'react';
import Stars from '@/components/Stars';
import ReviewModal from '@/components/ReviewModal';
import ReviewFullModal from '@/components/ReviewFullModal';
import AllReviewsModal from '@/components/AllReviewsModal';

type Review = { id?: string; name: string; pet?: string; rating: number; text: string; photo?: string; photos?: string[]; createdAt?: string };

const SEED: Review[] = [
  { name:'Екатерина и кот Мурзик', pet:'Мурзик', rating:5, text:'У кота началась рвота... объяснили, когда ехать в клинику, а когда наблюдать дома — это успокоило и сэкономило время.' },
  { name:'Антон и пёс Рич', pet:'Рич', rating:5, text:'Поддержка → структура → план. Через двое суток уточнили самочувствие и скорректировали дозу — стало лучше.' },
  { name:'Марина и Луна', pet:'Луна', rating:4, text:'Длинный отзыв: хроническая дерматология... подробный план ухода, критерии «красных флагов», стало лучше через пару недель.' },
  { name:'Сергей и Грета', pet:'Грета', rating:5, text:'Подсказали дозу обезболивающего и когда нужен рентген. Спасибо!' },
  { name:'Ирина и Миша', pet:'Миша', rating:5, text:'Ночью поднялась температура, помогли стабилизировать состояние до визита утром.' },
  { name:'Ольга и Мышь', pet:'джунгарик', rating:4, text:'Даже с хомячком: что смотреть, чем помочь, когда срочно к врачу.' }
];

const LIMIT = 6;

export default function Reviews() {
  const [all, setAll] = useState<Review[]>(SEED);
  const [full, setFull] = useState<Review | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/reviews');
        const payload = res.ok ? await res.json() : { items: [] };
        const fromApi: Review[] = (payload.items || []).map((r:any)=>({ id:r.id, name:r.name, pet:r.pet, rating:r.rating, text:r.text, photo:r.photo, photos:r.photos, createdAt:r.created_at }));
        const local: Review[] = JSON.parse(localStorage.getItem('onlyvet:reviews') || '[]');
        setAll([ ...fromApi, ...local, ...SEED ]);
      } catch {
        setAll(SEED);
      }
    })();
  }, []);

  const total = all.length;
  const countLabel = total > 99 ? '99+' : String(total);
  const list = all.slice(0, LIMIT);

  return (
    <section className="container py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold" style={{ color: 'var(--navy)', fontFamily: 'var(--font-montserrat)' }}>
          Отзывы
        </h2>
        <div className="flex items-center gap-3">
          <button className="btn bg-white border border-gray-300 rounded-xl px-4" onClick={()=>setShowAll(true)}>
            Все отзывы ({countLabel})
          </button>
          <button className="btn btn-primary" onClick={()=>setShowForm(true)}>Написать отзыв</button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {list.map((r, i) => {
          const long = r.text.length > 220;
          const preview = long ? r.text.slice(0, 200) + '…' : r.text;
          return (
            <article key={r.id ?? `seed-${i}`} className="bg-white rounded-2xl shadow-soft p-6 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="font-semibold" style={{ color: 'var(--navy)' }}>{r.name}</div>
                <Stars value={r.rating} />
              </div>
              <p className="text-sm text-gray-800 leading-6">{preview}</p>
              {long && <button className="text-teal text-sm mt-2" onClick={()=>setFull(r)}>Читать полностью</button>}
            </article>
          );
        })}
      </div>

      {showAll && (
        <AllReviewsModal
          items={all}
          onClose={()=>setShowAll(false)}
          onOpenFull={(r)=>{ setFull(r); }}
        />
      )}

      {full && (
        <ReviewFullModal
          review={full}
          onClose={()=>setFull(null)}
        />
      )}

      {showAll ? null : (showForm && <ReviewModal onClose={()=>setShowForm(false)} />)}
    </section>
  );
}
