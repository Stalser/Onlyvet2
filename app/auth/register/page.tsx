// app/auth/register/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg('');
    const r = await fetch('/api/auth/request-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    const data = await r.json();
    if (!r.ok) return setMsg(data?.error || 'Не удалось отправить код');
    setMsg(`Мы отправили код на ${email}${data.code ? ` (dev-код: ${data.code})` : ''}`);
    setTimeout(() => router.push('/auth/login?email=' + encodeURIComponent(email)), 600);
  }

  return (
    <section className="container py-16">
      <div className="card max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>
          Регистрация
        </h1>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div>
            <label className="label">Имя</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
          </div>
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <button className="btn btn-primary">Получить код и войти</button>
          {msg && <p className="text-sm opacity-80">{msg}</p>}
        </form>
      </div>
    </section>
  );
}
