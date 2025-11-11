'use client';
import { useEffect } from 'react';
import Stars from '@/components/Stars';

type Review = { id?: string; name: string; pet?: string; rating: number; text: string; photo?: string; photos?: string[]; createdAt?: string };

export default function AllReviewsModal({
  items,
  onClose,
  onOpenFull
}: {
  items: Review[];
  onClose: () => void;
  onOpenFull: (r: Review) => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();
  const firstPhoto = (r: Review) => (r.photos && r.photos.length ? r.photos[0] : (r.photo || ''));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label="Все отзывы">
      <div className="relative bg-white rounded-2xl shadow-2xl w-[96%] max-w-6xl max-h-[92vh] p-6 overflow-y-auto" onClick={stop}>
        <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring" onClick={onClose} aria-label="Закрыть" type="button">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
        </button>

        <h3 className="text-2xl font-semibold mb-4" style={{color:'var(--navy)'}}>Все отзывы</h3>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((r, i) => (
            <article key={r.id ?? `all-${i}`} className="bg-white rounded-2xl shadow-soft p-5 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="font-semibold text-[var(--navy)]">{r.name}</div>
                <Stars value={r.rating} />
              </div>
              {firstPhoto(r) && <img src={firstPhoto(r)!} alt={r.pet || ''} className="w-full h-40 object-cover rounded-xl mb-3" />}
              <p className="text-sm text-gray-800 whitespace-pre-wrap leading-6 line- clamp-6">{r.text}</p>
              <div className="mt-2">
                <button className="text-teal text-sm" onClick={()=>onOpenFull(r)}>Читать полностью</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
