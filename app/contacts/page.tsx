'use client';
import { useState } from 'react';

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
            Работаем удалённо по всей стране
          </div>
          <div className="text-xs opacity-70 mt-2">
            В экстренных случаях подскажем ближайшую офлайн-клинику-партнёра.
          </div>
        </div>
      </div>

      {/* Соцсети */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--navy)' }}>
          Мы в социальных сетях
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="https://t.me/onlyvet_support" target="_blank" rel="noopener noreferrer nofollow" className="card flex items-center gap-3 hover:shadow-lg transition">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--cloud)] text-[var(--navy)]">
              <svg viewBox="0 0 24 24" aria-hidden width="22" height="22"><path fill="currentColor" d="M9.8 16.9l-.1 3c.2 0 .4-.1.6-.3l2-1.9 4.1 3c.7.4 1.3.2 1.5-.6l2.7-12c.3-1.2-.4-1.7-1.3-1.4L2.7 9.7c-1.1.4-1.1 1 .2 1.4l4.5 1.4 10.5-6.6-8.1 7.8Z"/></svg>
            </span>
            <span className="font-semibold">Telegram</span>
          </a>

          <a href="https://vk.com/onlyvet" target="_blank" rel="noopener noreferrer nofollow" className="card flex items-center gap-3 hover:shadow-lg transition">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--cloud)] text-[var(--navy)]">
              <svg viewBox="0 0 24 24" aria-hidden width="22" height="22"><path fill="currentColor" d="M3 7c.1 5.7 3 10.4 9.4 10.4h.3v-3c2 .2 3.5 1.7 4.1 3H20c-.7-2.3-2.4-3.7-3.5-4.2 1-.6 2.6-2.1 3-6.2h-2.4c-.4 3-2 4.3-2.9 4.6V7h-2.2v5.9c-1-.3-3-1.6-3.1-5.9H5.5z"/></svg>
            </span>
            <span className="font-semibold">VK</span>
          </a>

          <a href="https://ok.ru/onlyvet" target="_blank" rel="noopener noreferrer nofollow" className="card flex items-center gap-3 hover:shadow-lg transition">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--cloud)] text-[var(--navy)]">
              <svg viewBox="0 0 24 24" aria-hidden width="22" height="22"><path fill="currentColor" d="M12 3.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 9c2.1 0 4-.6 5.6-1.7.5-.3.6-.9.3-1.4s-.9-.6-1.4-.3A7.7 7.7 0 0112 10a7.7 7.7 0 01-4.5-1.9c-.5-.3-1.1-.2-1.4.3s-.2 1.1.3 1.4A9.5 9.5 0 0012 12.5zm3.3 2.1c-.4-.5-1-.5-1.5-.1-.6.5-1.4.9-1.9 1.1-.5-.2-1.3-.6-1.9-1.1-.5-.4-1.1-.4-1.5.1s-.3 1.1.2 1.5c.7.6 1.6 1 2.2 1.3-.4.4-1 .9-1.6 1.5-.5.5-.5 1.1 0 1.6.4.4 1.1.4 1.6 0 .5-.6 1.1-1.2 1.5-1.6.5.4 1 .9 1.6 1.6.5.4 1.2.4 1.6 0 .4-.5.4-1.1 0-1.6a27 27 0 01-1.6-1.5c.6-.3 1.5-.7 2.2-1.3.5-.4.6-1 .1-1.5z"/></svg>
            </span>
            <span className="font-semibold">Одноклассники</span>
          </a>

          <a href="https://instagram.com/onlyvet" target="_blank" rel="noopener noreferrer nofollow" className="card flex items-center gap-3 hover:shadow-lg transition">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--cloud)] text-[var(--navy)]">
              <svg viewBox="0 0 24 24" aria-hidden width="22" height="22"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5A4.5 4.5 0 107 12a4.5 4.5 0 005-4.5zm6.3-.8a1.3 1.3 0 10-2.6 0 1.3 1.3 0 002.6 0zM12 9a3 3 0 100 6 3 3 0 000-6z"/></svg>
            </span>
            <span className="font-semibold">Instagram*</span>
          </a>
        </div>

        <p className="mt-4 text-xs opacity-70 leading-relaxed">
          * Instagram является продуктом компании Meta Platforms Inc.<br/>
          Meta Platforms Inc. признана экстремистской организацией и запрещена на территории Российской Федерации.<br/>
          Ссылка приведена исключительно для пользователей, находящихся вне территории РФ.
        </p>
      </section>

      <p className="text-xs opacity-40 mt-6">onlyvet-contacts v1.4</p>
    </section>
  );
}
