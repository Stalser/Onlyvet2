// app/auth/login/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const qs = new URLSearchParams(window.location.search);
      const preset = qs.get('email');
      if (preset) setEmail(preset);
    }
  }, []);

  async function sendCode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMsg('');
    const res = await fetch('/api/auth/request-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok) {
      setSent(true);
      setMsg(`Код отправлен на ${email}${data.code ? ` (dev: ${data.code})` : ''}`);
    } else setMsg(data?.error || 'Не удалось отправить код');
  }

  async function verify(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setMsg('');
    const res = await fetch('/api/auth/verify-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    if (res.ok) router.push('/account');
    else setMsg(data?.error || 'Код не принят');
  }

  return (
    <section className="container py-16">
      <div className="card max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-montserrat)' }}>Вход</h1>
        {!sent ? (
          <form onSubmit={sendCode} className="grid gap-4">
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
            </div>
            <button className="btn btn-primary">Отправить код</button>
            {msg && <p className="text-sm opacity-80">{msg}</p>}
          </form>
        ) : (
          <form onSubmit={verify} className="grid gap-4">
            <div className="text-sm opacity-80">Мы отправили код на {email}. Введите его ниже.</div>
            <div>
              <label className="label">Код</label>
              <input className="input" value={code} onChange={e=>setCode(e.target.value)} required />
            </div>
            <button className="btn btn-primary">Войти</button>
            {msg && <p className="text-sm opacity-80">{msg}</p>}
          </form>
        )}
      </div>
    </section>
  );
}
