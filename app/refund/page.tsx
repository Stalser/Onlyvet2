export const metadata = { title: 'Политика возвратов — OnlyVet' };

export default function RefundPage() {
  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-4" style={{fontFamily:'var(--font-montserrat)'}}>Политика возвратов</h1>
      <div className="card space-y-4 text-sm opacity-90">
        <p><b>Возврат возможен</b>, если услуга не была оказана (врач не вышел на связь в заявленное время, техническая невозможность с нашей стороны).</p>
        <p><b>Возврат частичный</b> возможен при раннем завершении консультации по нашей инициативе.</p>
        <p><b>Возврат невозможен</b>, если консультация состоялась и была оказана медицинская услуга в полном объёме. В экстренных случаях мы рекомендуем немедленно обращаться в офлайн‑клинику.</p>
        <p>Срок рассмотрения заявок — до 5 рабочих дней. Пишите на <a className="text-teal underline" href="mailto:support@onlyvet.example">support@onlyvet.example</a>.</p>
      </div>
    </section>
  );
}
