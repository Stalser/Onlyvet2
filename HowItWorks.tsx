export default function HowItWorks() {
  const steps = [
    { t: 'Опишите проблему', d: 'Коротко заполните форму: симптомы, длительность, препараты. Прикрепите фото/видео и анализы.' },
    { t: 'Врач на связи', d: 'Соберём анамнез, оценим риски (“красные флаги”), дадим план диагностики и лечения.' },
    { t: 'Выписка и контроль', d: 'Получите письменную выписку. При необходимости — контроль через 48–72 часа.' },
  ];
  return (
    <section className="container py-12">
      <h2 className="text-3xl font-bold mb-8" style={{fontFamily:'var(--font-montserrat)'}}>Как это работает</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map(s => (
          <div key={s.t} className="card">
            <div className="text-coral font-semibold mb-1">{s.t}</div>
            <div className="opacity-80 text-sm">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
