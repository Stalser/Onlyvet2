'use client';
import { useEffect, useState } from 'react';

type Review = { id?: string; name: string; pet?: string; rating: number; text: string; photo?: string; photos?: string[] };

export default function ReviewFullModal({
  review,
  onClose
}: {
  review: Review;
  onClose: () => void;
}) {
  const gallery = (review.photos && review.photos.length ? review.photos : (review.photo ? [review.photo] : []));
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && idx < gallery.length - 1) setIdx(i => i + 1);
      if (e.key === 'ArrowLeft' && idx > 0) set_idx(i => i - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose, idx, gallery.length]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Полный текст отзыва" onClick={onClose}>
      <div onClick={(e)=>e.stopPropagation()} className="relative bg-white rounded-2xl shadow-2xl w-[96%] max-w-3xl mx-4 p-6">
        <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring" onClick={onClose} aria-label="Закрыть" type="button">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
        </button>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {gallery.length > 0 && (
            <div className="w-full md:w-1/3">
              <div className="relative w-full h-48 md:h-64 bg-[var(--cloud)] rounded-lg overflow-hidden">
                <img src={gallery[idx]} alt={review.pet || 'Фото отзыва'} className="w-full h-48 md:h-full object-cover" />
                {gallery.length > 1 && (
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                    <button disabled={idx===0} className={`p-2 rounded-full bg-white/80 ${idx===0?'opacity-40':'hover:bg-white'}`} onClick={()=>setIdx(i=>Math.max(0,i-1))} aria-label="Назад" type="button">‹</button>
                    <button disabled={idx===gallery.length-1} className={`p-2 rounded-full bg-white/80 ${idx===gallery.length-1?'opacity-40':'hover:bg-white'}`} onClick={()=>setIdx(i=>Math.min(gallery.length-1,i+1))} aria-label="Вперёд" type="button">›</button>
                  </div>
                )}
              </div>
              {gallery.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto">
                  {gallery.map((g, i) => (
                    <button key={i} onClick={()=>setIdx(i)} className={`w-12 h-12 rounded-lg overflow-hidden border ${i===idx?'border-[var(--teal)]':'border-gray-200'}`}>
                      <img src={g} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[var(--navy)]">{review.name}</h3>
            {review.pet ? <div className="text-sm text-gray-600 mt-1">{review.pet}</div> : null}
            <div className="mt-2 text-sm text-gray-700">Оценка: {review.rating} / 5</div>
          </div>
        </div>

        <div className="text-gray-900 leading-7 whitespace-pre-wrap">{review.text}</div>

        <div className="mt-6 flex justify-end">
          <button className="btn btn-secondary" onClick={onClose} type="button">Закрыть</button>
        </div>
      </div>
    </div>
  );
}
