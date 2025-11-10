export default function Advantages() {
  const items = [
    { title: 'Доказательная помощь', desc: 'Рекомендации по клиническим гайдам и стандартам — ничего лишнего.' },
    { title: 'Экономия времени', desc: 'Без дороги и очередей. Быстрый старт консультации за 30 секунд.' },
    { title: 'Забота и спокойствие', desc: 'Пишем просто и по делу. Поддерживаем, структурируем, предлагаем решение.' },
    { title: 'Выбор специалиста', desc: 'Терапевты, дерматологи, кардиологи, поведения — выбираете сами.' },
  ];
  return (
    <section id="advantages" className="container py-16">
      <h2 className="text-3xl font-bold mb-10" style={{fontFamily: 'var(--font-montserrat)'}}>Почему онлайн-консультации OnlyVet</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((i) => (
          <div key={i.title} className="card">
            <div className="text-coral font-semibold mb-2">{i.title}</div>
            <div className="opacity-80 text-sm">{i.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
