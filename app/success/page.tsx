import Link from 'next/link';
export default function SuccessPage() {
  return (
    <section className="container py-24">
      <div className="card text-center">
        <div className="text-2xl font-bold mb-2" style={{fontFamily:'var(--font-montserrat)'}}>Оплата прошла успешно</div>
        <p className="opacity-80">Подтверждение и детали консультации отправлены на вашу почту. Запись доступна в Личном кабинете.</p>
        <div className="mt-6 flex gap-3 justify-center">
          <Link href="/account" className="btn btn-secondary">Открыть ЛК</Link>
          <Link href="/" className="btn btn-primary">На главную</Link>
        </div>
      </div>
    </section>
  );
}
