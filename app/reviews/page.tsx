// app/reviews/page.tsx

import Stars from '../../components/Stars';

const demoReviews = [
  {
    id: 1,
    author: 'Анна',
    text: 'Очень внимательный врач, подробно объяснил все назначения.',
    rating: 5,
  },
  {
    id: 2,
    author: 'Игорь',
    text: 'Быстро помогли, хороший сервис.',
    rating: 4,
  },
];

export default function ReviewsPage() {
  return (
    <div className="container py-12 space-y-4">
      <h1 className="text-2xl font-semibold">Отзывы клиентов</h1>

      <div className="space-y-3">
        {demoReviews.map((r) => (
          <div
            key={r.id}
            className="rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-800"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="font-medium">{r.author}</div>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Stars value={r.rating} />
                <span>{r.rating}.0</span>
              </div>
            </div>
            <p className="text-gray-700 text-sm">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
