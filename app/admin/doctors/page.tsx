// app/admin/doctors/page.tsx
'use client';
import { useEffect, useState } from 'react';
type Row = { email: string; name: string; specialty?: string };
export default function AdminDoctors(){
  const [items, setItems] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>({ email:'', name:'', specialty:'' });
  const load = async ()=>{ const res = await fetch('/api/admin/doctors'); const data = await res.json(); setItems(data.items||[]); };
  useEffect(()=>{ load(); },[]);
  const add = async ()=>{ await fetch('/api/admin/doctors', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) }); setForm({ email:'', name:'', specialty:'' }); load(); };
  const del = async (email: string)=>{ await fetch('/api/admin/doctors?email='+encodeURIComponent(email), { method:'DELETE' }); load(); };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h1 className="text-2xl font-semibold mb-4" style={{color:'var(--navy)'}}>Сотрудники (врачи)</h1>
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <input className="input" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input className="input" placeholder="Имя" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input className="input" placeholder="Специальность" value={form.specialty} onChange={e=>setForm({...form, specialty:e.target.value})}/>
      </div>
      <button className="btn btn-primary rounded-xl px-4 mb-4" onClick={add} disabled={!form.email}>Добавить врача</button>
      <div className="border-t pt-3">
        {items.length===0 && <div className="opacity-70">Список пуст</div>}
        {items.map((r)=>(
          <div key={r.email} className="flex items-center justify-between gap-3 border rounded-xl p-3 mb-2">
            <div className="text-sm"><b>{r.name||r.email}</b> · {r.email}{r.specialty? ' · '+r.specialty: ''}</div>
            <button className="btn bg-white border border-gray-300 rounded-xl px-3" onClick={()=>del(r.email)}>Удалить</button>
          </div>
        ))}
      </div>
      <div className="text-xs opacity-70 mt-3">Демо-режим: данные живут в памяти процесса. Для продакшена подключим БД.</div>
    </div>
  );
}
