'use client';
import { useState } from 'react';

export default function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [consent, setConsent] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) return alert('Подтвердите согласие на обработку данных');
    setLoading(true);
    setOk(false);
    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());
    const res = await fetch('/api/feedback', { method: 'POST', body: JSON.stringify(payload) });
    setLoading(false);
    setOk(res.ok);
    if (res.ok) (e.currentTarget as HTMLFormElement).reset();
  }

  return (
    <section id="feedback" className="container py-16">
      <h2 className="text-3xl font-bold mb-6" style={{fontFamily: 'var(--font-montserrat)'}}>Обратная связь</h2>
      <form onSubmit={onSubmit} className="card grid md:grid-cols-2 gap-5">
        <div>
          <label className="label">Ваше имя</label>
          <input name="name" className="input" required />
        </div>
        <div>
          <label className="label">Email</label>
          <input name="email" type="email" className="input" required />
        </div>
        <div className="md:col-span-2">
          <label className="label">Сообщение</label>
          <textarea name="message" className="textarea h-28" required />
        </div>

        <label className="md:col-span-2 inline-flex items-center gap-2 text-sm">
          <input type="checkbox" onChange={(e)=>setConsent(e.target.checked)} />
          <span>Согласен(а) с <a href="/privacy" className="text-teal underline">Политикой конфиденциальности</a> и <a href="/terms" className="text-teal underline">Пользовательским соглашением</a>.</span>
        </label>

        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={loading} className="btn btn-primary">{loading ? 'Отправка…' : 'Отправить'}</button>
          {ok && <span className="text-teal">Спасибо! Мы ответим вам на email.</span>}
        </div>
      </form>
    </section>
  );
}
