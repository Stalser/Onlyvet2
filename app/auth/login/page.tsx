// app/auth/login/page.tsx
'use client';
import { useState } from 'react';
import { loadAccount } from '@/lib/account';

export default function LoginPage(){
  const [email,setEmail]=useState('');
  const [ok,setOk]=useState(false);
  const [err,setErr]=useState('');

  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const acc = loadAccount();
    if(acc.user && acc.user.email===email){ setOk(true); setErr(''); }
    else{ setErr('Пользователь не найден (демо). Сначала зарегистрируйтесь.'); }
  }

  return (
    <section className="container py-16">
      <div className="card max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4" style={{fontFamily:'var(--font-mонтserrat)'}}>Вход</h1>
        <form onSubmit={submit} className="grid gap-4">
          <div><label className="label">Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <button className="btn btn-primary">Войти</button>
          {ok && <p className="text-teal text-sm">Вход выполнен (демо). Откройте /account</p>}
          {err && <p className="text-red-600 text-sm">{err}</p>}
        </form>
      </div>
    </section>
  );
}
