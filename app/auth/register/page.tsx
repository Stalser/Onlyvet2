// app/auth/register/page.tsx
'use client';
import { useState } from 'react';
import { saveAccount, loadAccount, newId } from '@/lib/account';

export default function RegisterPage(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [ok,setOk]=useState(false);

  function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    const acc = loadAccount();
    acc.user = { id: newId('u'), name, email };
    saveAccount(acc);
    setOk(true);
  }

  return (
    <section className="container py-16">
      <div className="card max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4" style={{fontFamily:'var(--font-mонтserrat)'}}>Регистрация</h1>
        <form onSubmit={submit} className="grid gap-4">
          <div><label className="label">Имя</label><input className="input" value={name} onChange={e=>setName(e.target.value)} required/></div>
          <div><label className="label">Email</label><input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
          <button className="btn btn-primary">Создать аккаунт</button>
          {ok && <p className="text-teal text-sm">Готово! Теперь можно перейти в личный кабинет.</p>}
        </form>
      </div>
    </section>
  );
}
