export default function Reviews() {
  const items = [
    {
      name: 'Екатерина и кот Мурзик',
      text: 'За 15 минут разобрались с рвотой, врач спокойно объяснил, что критичного нет и что смотреть дальше. Без поездки в клинику — это было важно.',
    },
    {
      name: 'Антон и пес Рич',
      text: 'Понравилась структура: поддержка → шаги → решение. Через двое суток спросили, как дела, скорректировали дозу — стало лучше.',
    },
    {
      name: 'Марина и шпициха Луна',
      text: 'Загрузила анализы, врач разложил всё по пунктам и дал план. Очень аккуратный и спокойный тон, это помогает.',
    },
  ];
  return (
    <section className="container py-16">
      <h2 className="text-3xl font-bold mb-8" style={{fontFamily:'var(--font-montserrat)'}}>Отзывы</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((r, i) => (
          <div key={i} className="card">
            <div className="text-coral font-semibold mb-2">{r.name}</div>
            <p className="opacity-90 text-sm">{r.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
