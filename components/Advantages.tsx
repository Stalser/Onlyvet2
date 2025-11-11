export default function Advantages() {
  const items = [
    { title: 'Доказательная помощь', desc: 'Рекомендации по клиническим гайдам, без лишних препаратов.' },
    { title: 'Сбор анамнеза до связи', desc: 'Форма с симптомами, файлами и лекарствами экономит время и повышает точность.' },
    { title: 'Чёткие решения', desc: 'Поддержка → структура → план (3S). Письменная выписка для владельца.' },
    { title: 'Маршрутизация офлайн', desc: 'Подсказываем, когда нужен очный осмотр, без компромиссов по безопасности.' },
  ];
  return (
    <section id="advantages" className="container py-16">
      <h2 className="text-3xl font-bold mb-10" style={{fontFamily: 'var(--font-montserrat)'}}>Почему OnlyVet</h2>
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
