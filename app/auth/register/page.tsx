// app/auth/register/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg('');
    const fio = [lastName, firstName, patronymic].filter(Boolean).join(' ');
    const r = await fetch('/api/auth/request-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, fio, phone }),
    });
    const data = await r.json();
    if (!r.ok) return setMsg(data?.error || 'Не удалось отправить код');
    setMsg(`Мы отправили код на ${email}${data.code ? ` (dev-код: ${data.code})` : ''}`);
    setTimeout(() => router.push('/auth/login?email=' + encodeURIComponent(email)), 600);
  }

  return (
    <section className="container py-16">
      <div className="card max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-mонтserrat)' }}>
          Регистрация
        </h1>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div><label className="label">Фамилия</label><input className="input" value={lastName} onChange={e=>setLastName(e.target.value)} required/></div>
            <div><label className="label">Имя</label><input className="input" value={firstName} onChange={e=>setFirstName(e.target.value)} required/></div>
            <div><label className="label">Отчество</label><input className="input" value={patronymic} onChange={e=>setPatronymic(e.target.value)} placeholder="необязательно"/></div>
          </div>
          <div>
            <label className="label">Телефон</label>
            <input className="input" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+7 999 000‑00‑00" required/>
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
          </div>
          <button className="btn btn-primary">Получить код и войти</button>
          {msg && <p className="text-sm opacity-80">{msg}</p>}
        </form>
      </div>
    </section>
  );
}
