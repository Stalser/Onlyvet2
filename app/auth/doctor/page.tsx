// app/auth/doctor/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DoctorLoginPage(){
  const router = useRouter();
  const [email, setEmail] = useState('doctor@example.com');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');

  const send = async ()=>{
    const res = await fetch('/api/doctor/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
    const data = await res.json();
    if(res.ok) setSent(true); else alert(data?.error||'Ошибка');
  };
  const verify = async ()=>{
    if(code.trim()!=='111111'){ alert('Неверный код'); return; }
    await fetch('/api/doctor/session', { method:'POST' });
    router.replace('/doctor');
  };

  return (
    <section className="container py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-4" style={{color:'var(--navy)'}}>Вход для врача</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 max-w-md">
        {!sent ? (
          <div className="space-y-3">
            <label className="block text-sm">E-mail сотрудника</label>
            <input className="input w-full" value={email} onChange={e=>setEmail(e.target.value)} placeholder="doctor@onlyvet.ru"/>
            <button className="btn btn-primary rounded-xl px-4" onClick={send}>Получить код</button>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block text-sm">Код из письма</label>
            <input className="input w-full" value={code} onChange={e=>setCode(e.target.value)} placeholder="111111"/>
            <button className="btn btn-primary rounded-xl px-4" onClick={verify}>Войти</button>
          </div>
        )}
      </div>
    </section>
  );
}
