export const metadata = { title: 'Красные флаги — OnlyVet' };

const items = [
  { t: 'Затруднённое дыхание, цианоз', d: 'Немедленно в ближайшую клинику. Не ждите онлайн-консультации.' },
  { t: 'Судороги, потеря сознания', d: 'Экстренно в офлайн. Зафиксируйте видео приступа, это поможет врачу.' },
  { t: 'Сильное кровотечение, травма', d: 'Наложите давящую повязку/жгут (если нужно) и в клинику.' },
  { t: 'Уринарная задержка (кот не мочится)', d: 'Это опасно для жизни. Срочно в клинику.' },
  { t: 'Повторная рвота у щенка/котёнка, вялость', d: 'Высокий риск обезвоживания. Нужен офлайн‑осмотр.' },
  { t: 'Отказ от воды > 12 ч или от еды > 24–36 ч', d: 'Оценка офлайн, по показаниям инфузия и анализы.' },
];

export default function RedFlags() {
  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-4" style={{fontFamily:'var(--font-montserrat)'}}>Красные флаги</h1>
      <p className="opacity-80 mb-8">Ситуации, когда онлайн‑формат неуместен и требуется срочный офлайн‑визит.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map(i => (
          <div key={i.t} className="card">
            <div className="text-coral font-semibold">{i.t}</div>
            <div className="opacity-80 text-sm mt-1">{i.d}</div>
          </div>
        ))}
      </div>
      <div className="card mt-8">
        <div className="font-semibold mb-2">Ближайшая клиника</div>
        <p className="opacity-80 text-sm">При ухудшении состояния — сразу обращайтесь в круглосуточную клинику. Мы поможем с маршрутизацией после стабилизации.</p>
      </div>
    </section>
  );
}
