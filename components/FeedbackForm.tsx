'use client';
import { useState } from 'react';

export default function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={loading} className="btn btn-primary">{loading ? 'Отправка…' : 'Отправить'}</button>
          {ok && <span className="text-teal">Спасибо! Мы свяжемся с вами в ближайшее время.</span>}
        </div>
      </form>
    </section>
  );
}
