'use client';
import Stars from '@/components/Stars';

export default function ReviewFullModal({
  name, text, rating, pet, photo, onClose
}: { name: string; text: string; rating: number; pet?: string; photo?: string; onClose: ()=>void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-soft max-w-2xl w-full mx-4 p-6 overflow-y-auto max-h-[90vh]">
        <button className="absolute top-3 right-3 p-2" onClick={onClose} aria-label="Закрыть">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold" style={{fontFamily:'var(--font-montserrat)'}}>{name}</div>
          <Stars value={rating} />
        </div>
        {pet ? <div className="opacity-70 text-sm mb-2">Питомец: {pet}</div> : null}
        {photo ? <img src={photo} alt="Фото питомца" className="rounded-2xl mb-4 max-h-64 object-contain" /> : null}
        <p className="opacity-90 whitespace-pre-wrap">{text}</p>
        <div className="mt-6 flex justify-end">
          <button className="btn btn-secondary" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}
