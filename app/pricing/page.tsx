export const metadata = { title: 'Цены — OnlyVet' };
const items = [
  { name: 'Чат-консультация (до 30 мин)', price: '900 ₽', desc: 'Первая помощь, маршрутизация, проверка анализов.' },
  { name: 'Видео-консультация (30 мин)', price: '1 500 ₽', desc: 'Разбор сложных случаев, план действий.' },
  { name: 'Повторный контроль', price: '700 ₽', desc: 'Краткая коррекция терапии, ответы на вопросы.' },
];
export default function PricingPage() {
  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-6" style={{fontFamily:'var(--font-montserrat)'}}>Цены</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map(i => (
          <div key={i.name} className="card">
            <div className="font-semibold">{i.name}</div>
            <div className="text-2xl font-bold mt-2">{i.price}</div>
            <div className="opacity-80 text-sm mt-2">{i.desc}</div>
          </div>
        ))}
      </div>
      <p className="text-sm opacity-70 mt-6">Итоговая стоимость может отличаться при дополнительных услугах. Оплата на странице оформления.</p>
    </section>
  );
}
