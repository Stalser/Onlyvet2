'use client';
import { useState } from 'react';
import Socials from '@/components/Socials';

export default function ContactsPage() {
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(payload) });
    setLoading(false);
    if (res.ok) { setOk(true); (e.currentTarget as HTMLFormElement).reset(); }
  }

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--navy)' }}>
        Контакты
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="text-sm opacity-80">Email</div>
          <div className="font-semibold">support@onlyvet.example</div>
          <div className="text-sm opacity-70 mt-2">Мы отвечаем в течение рабочего дня</div>
        </div>
        <div className="card">
          <div className="text-sm opacity-80">Телеграм</div>
          <div className="font-semibold">@onlyvet_support</div>
          <div className="text-sm opacity-70 mt-2">Быстрые вопросы и статусы заявок</div>
        </div>
        <div className="card">
          <div className="text-sm opacity-80">Режим работы</div>
          <div className="font-semibold">Онлайн 24/7</div>
          <div className="text-sm opacity-70 mt-2">Мы онлайн-клиника: фактического адреса нет.</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="card">
          <div className="text-lg font-semibold mb-3">Напишите нам</div>
          <form onSubmit={submit} className="grid gap-4">
            <div>
              <label className="label">Ваше имя</label>
              <input className="input" name="name" required />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" name="email" required />
            </div>
            <div>
              <label className="label">Сообщение</label>
              <textarea className="textarea h-28" name="message" required />
            </div>
            <div className="flex items-center gap-3">
              <button className="btn btn-primary" disabled={loading}>{loading ? 'Отправка…' : 'Отправить'}</button>
              {ok && <span className="text-teal text-sm">Спасибо! Мы свяжемся с вами.</span>}
            </div>
          </form>
        </div>

        <div className="card">
          <div className="text-lg font-semibold mb-3">Мы онлайн</div>
          <div className="rounded-xl bg-[var(--cloud)] h-64 flex items-center justify-center text-sm opacity-70">
            Мы работаем удалённо по всей стране
          </div>
          <div className="text-xs opacity-70 mt-2">
            В экстренных случаях мы подскажем ближайшую офлайн-клинику-партнёра.
          </div>
        </div>
      </div>

      <Socials />
    </section>
  );
}
