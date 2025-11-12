'use client';
import Link from 'next/link';

export default function InstructionsPage(){
  return (
    <section className="container py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-4" style={{color:'var(--navy)'}}>Инструкции и ответы</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <p className="opacity-90">Как связаться: <Link href="/booking" className="text-[var(--teal)] underline">Записаться</Link> или через кнопки в шапке (Telegram/VK).</p>
        <p className="opacity-90 mt-2">Регистрация/вход: <Link href="/auth/login" className="text-[var(--teal)] underline">«Войти»</Link> → e‑mail → код из письма.</p>
        <p className="opacity-90 mt-2">Оплата: картой/СБП при записи, чек на e‑mail.</p>
        <p className="opacity-90 mt-2">Подготовка к онлайн‑приёму: фото проблемы, параметры (t°, вес, ЧДД) и список лекарств.</p>
      </div>
    </section>
  );
}
