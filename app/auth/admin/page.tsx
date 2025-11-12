// app/auth/admin/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage(){
  const router = useRouter();
  const [email, setEmail] = useState('admin@onlyvet.ru');
  const [code, setCode] = useState('');
  const [mode, setMode] = useState<'email'|'code'>('email');
  const send = async ()=>{ setMode('code'); };
  const verify = async ()=>{ await fetch('/api/admin/session', { method:'POST' }); router.replace('/admin'); };

  return (
    <section className="container py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-4" style={{color:'var(--navy)'}}>Вход администратора</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 max-w-md">
        {mode==='email' ? (
          <div className="space-y-3">
            <label className="block text-sm">E-mail</label>
            <input className="input w-full" value={email} onChange={e=>setEmail(e.target.value)} />
            <button className="btn btn-primary rounded-xl px-4" onClick={send}>Получить код</button>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block text-sm">Код</label>
            <input className="input w-full" value={code} onChange={e=>setCode(e.target.value)} placeholder="------"/>
            <button className="btn btn-primary rounded-xl px-4" onClick={verify}>Войти</button>
          </div>
        )}
      </div>
    </section>
  );
}
