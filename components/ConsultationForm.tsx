// components/ConsultationForm.tsx
'use client';
import { useState } from 'react';

export default function ConsultationForm({ onSaved }:{ onSaved:()=>void }){
  const [date,setDate]=useState('');
  const [service,setService]=useState('');
  const [doctorName,setDoctorName]=useState('');
  const [summary,setSummary]=useState('');
  const [recommendations,setRecommendations]=useState('');
  const [msg,setMsg]=useState('');

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setMsg('');
    const res = await fetch('/api/consultations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({date,service,doctorName,summary,recommendations})});
    const data = await res.json();
    if(res.ok){ setMsg('Сохранено'); setDate(''); setService(''); setDoctorName(''); setSummary(''); setRecommendations(''); onSaved(); }
    else setMsg(data?.error || 'Ошибка');
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div><label className="label">Дата</label><input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} required/></div>
      <div><label className="label">Услуга</label><input className="input" value={service} onChange={e=>setService(e.target.value)} placeholder="например, Видео‑консультация"/></div>
      <div><label className="label">Врач</label><input className="input" value={doctorName} onChange={e=>setDoctorName(e.target.value)}/></div>
      <div><label className="label">Итоги</label><textarea className="textarea h-20" value={summary} onChange={e=>setSummary(e.target.value)}/></div>
      <div><label className="label">Рекомендации</label><textarea className="textarea h-20" value={recommendations} onChange={e=>setRecommendations(e.target.value)}/></div>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary">Добавить консультацию</button>
        {msg && <span className="text-xs opacity-70">{msg}</span>}
      </div>
    </form>
  );
}
