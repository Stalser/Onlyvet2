// app/auth/doctor/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockDoctor, saveDoctorSession } from '@/lib/doctor';

export default function DoctorLoginPage(){
  const router = useRouter();
  const [email, setEmail] = useState('doctor@example.com');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');

  const send = async () => {
    try{
      const res = await fetch('/api/doctor/login', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
      const data = await res.json();
      if(res.ok){ setSent(true); setMsg(`Код отправлен на ${email} ${data.code ? `(dev: ${data.code})` : ''}`); }
      else setMsg(data?.error || 'Ошибка отправки');
    }catch(e){ setMsg('Сеть недоступна'); }
  };

  const verify = async () => {
    if(code.trim()!=='111111'){ setMsg('Неверный код'); return; }
    saveDoctorSession(mockDoctor);
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
            {msg && <div className="text-sm opacity-80">{msg}</div>}
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block text-sm">Код из письма</label>
            <input className="input w-full" value={code} onChange={e=>setCode(e.target.value)} placeholder="------"/>
            <button className="btn btn-primary rounded-xl px-4" onClick={verify}>Войти</button>
            {msg && <div className="text-sm opacity-80">{msg}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
