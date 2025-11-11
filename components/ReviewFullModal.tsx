
'use client';

type Props = {
  name: string;
  pet?: string;
  rating: number;
  text: string;
  photo?: string;
  onClose: () => void;
};

export default function ReviewFullModal({ name, pet, rating, text, photo, }: Props & { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={() => history.back()} />
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-6">
        <button className="absolute top-3 right-3 p-2" onClick={() => history.back()} aria-label="Закрыть">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
        <div className="flex gap-4 mb-4">
          <div className="w-40 h-28 rounded-lg overflow-hidden flex-shrink-0" style={{ background: '#eef2f7' }}>
            <img src={photo} alt={pet || ''} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <div className="text-lg font-semibold">{name}</div>
            <div className="text-sm text-gray-600">{pet}</div>
            <div className="mt-1 text-sm">Оценка: {rating} / 5</div>
          </div>
        </div>
        <div className="text-gray-900 leading-7 whitespace-pre-wrap">{text}</div>
      </div>
    </div>
  );
}
