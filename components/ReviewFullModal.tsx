'use client';
import { useEffect } from 'react';

type Props = {
  name: string;
  pet?: string;
  rating: number;
  text: string;
  photo?: string;
  onClose: () => void;
};

export default function ReviewFullModal({ name, pet, rating, text, photo, onClose }: Props) {
  // Lock body scroll & close on ESC
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Полный текст отзыва"
      onClick={onClose}
    >
      <div
        onClick={stop}
        className="relative bg-white rounded-2xl shadow-2xl w-[92%] max-w-3xl mx-4 p-6"
      >
        <button
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring"
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
        >
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {photo ? (
            <div className="w-full md:w-1/3">
              <img
                src={photo}
                alt={pet || 'Фото отзыва'}
                className="w-full h-48 md:h-full object-cover rounded-lg"
              />
            </div>
          ) : null}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-[var(--navy)]">{name}</h3>
            {pet ? <div className="text-sm text-gray-600 mt-1">{pet}</div> : null}
            <div className="mt-2 text-sm text-gray-700">Оценка: {rating} / 5</div>
          </div>
        </div>

        <div className="text-gray-900 leading-7 whitespace-pre-wrap">{text}</div>

        <div className="mt-6 flex justify-end">
          <button className="btn btn-secondary" onClick={onClose} type="button">Закрыть</button>
        </div>
      </div>
    </div>
  );
}
