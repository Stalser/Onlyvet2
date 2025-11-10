export const metadata = { title: 'О нас — OnlyVet' };
export default function AboutPage() {
  return (
    <section className="container py-16">
      <div className="card">
        <h1 className="text-3xl font-bold mb-4" style={{fontFamily:'var(--font-montserrat)'}}>О нас</h1>
        <p className="opacity-90">OnlyVet — цифровая ветеринарная клиника. Мы помогаем владельцам быстро и бережно получить доказательную помощь: онлайн-чат, видео-консультации, маршрутизация в офлайн при необходимости.</p>
        <ul className="list-disc ml-6 mt-4 opacity-90 text-sm">
          <li>Тон общения: забота + компетентность + простота.</li>
          <li>Стандарты: клинические гайды, безопасность, прозрачность стоимости.</li>
          <li>Технологии: удобный чат, быстрый старт, интеграция с CRM Vetmanager.</li>
        </ul>
      </div>
    </section>
  );
}
