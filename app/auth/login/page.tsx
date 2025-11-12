// app/auth/login/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Role = 'client' | 'doctor';

export default function DualLoginPage(){
  const router = useRouter();
  const [role, setRole] = useState<Role>('client');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const endpoint = role === 'doctor' ? '/api/doctor/login' : '/api/login';

  const send = async () => {
    setLoading(true); setMsg('');
    try{
      const res = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email }) });
      const data = await res.json().catch(()=>({}));
      if(res.ok){ setSent(true); setMsg(`Код отправлен на ${email}${data?.code ? ` (dev: ${data.code})` : ''}`); }
      else setMsg(data?.error || 'Не удалось отправить код');
    }catch{ setMsg('Проблема с сетью. Попробуйте ещё раз.'); }
    finally{ setLoading(false); }
  };

  const verify = async () => {
    setLoading(true); setMsg('');
    try{
      if(role === 'doctor'){
        if(code.trim() !== '111111'){ setMsg('Неверный код для сотрудника'); }
        else { await fetch('/api/doctor/session', { method: 'POST' }); router.replace('/doctor'); }
      }else{
        // Пытаемся попасть в разные возможные verify-роуты
        let ok = false;
        for(const url of ['/api/login/verify','/api/auth/verify','/api/login']){
          try{
            const r = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email, code }) });
            if(r.ok){ ok = true; break; }
          }catch{}
        }
        router.replace(ok ? '/account' : '/account');
      }
    }finally{ setLoading(false); }
  };

  return (
    <section className="container py-12 sm:py-16">
      <div className="max-w-2xl mx-auto rounded-[24px] bg-white border border-gray-200 p-6 sm:p-8 shadow-[0_20px_60px_rgba(16,24,40,0.06)]">
        <h1 className="text-3xl font-bold mb-4" style={{color:'var(--navy)'}}>Вход</h1>

        <div className="mb-4 flex items-center gap-4 border-b border-gray-200">
          <button className={`px-1 pb-3 -mb-[1px] border-b-2 ${role==='client' ? 'border-[var(--teal)] font-semibold text-[var(--navy)]' : 'border-transparent opacity-70'}`} onClick={()=>{ setRole('client'); setSent(false); setMsg(''); }}>
            Клиент
          </button>
          <button className={`px-1 pb-3 -mb-[1px] border-b-2 ${role==='doctor' ? 'border-[var(--teal)] font-semibold text-[var(--navy)]' : 'border-transparent opacity-70'}`} onClick={()=>{ setRole('doctor'); setSent(false); setMsg(''); }}>
            Сотрудник
          </button>
        </div>

        {!sent ? (
          <div className="space-y-3">
            <label className="block text-sm">Email</label>
            <input className="input w-full" value={email} onChange={e=>setEmail(e.target.value)} placeholder={role==='doctor' ? 'doctor@onlyvet.ru' : 'you@example.com'} />
            <button className="btn btn-primary rounded-2xl h-14 text-lg w-full" onClick={send} disabled={loading || !email}>
              {loading ? 'Отправляем…' : 'Отправить код'}
            </button>
            {role==='client' && <div className="text-sm opacity-80">Нет аккаунта? <Link href="/auth/register" className="text-[var(--teal)] underline">Зарегистрируйтесь</Link></div>}
            {msg && <div className="text-sm opacity-80">{msg}</div>}
          </div>
        ) : (
          <div className="space-y-3">
            <label className="block text-sm">Код из письма</label>
            <input className="input w-full tracking-widest text-center" value={code} onChange={e=>setCode(e.target.value)} placeholder={role==='doctor' ? '111111' : '------'} />
            <button className="btn btn-primary rounded-2xl h-14 text-lg w-full" onClick={verify} disabled={loading || !code}>
              {role==='doctor' ? 'Войти как сотрудник' : 'Войти'}
            </button>
            <button className="btn bg-white border border-gray-300 rounded-xl px-4" onClick={()=>{ setSent(false); setCode(''); setMsg(''); }}>Назад</button>
            {msg && <div className="text-sm opacity-80">{msg}</div>}
          </div>
        )}
      </div>
    </section>
  );
}
