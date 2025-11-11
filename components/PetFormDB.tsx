// components/PetFormDB.tsx
'use client';
import { useState } from 'react';

export default function PetFormDB({ onSaved }:{ onSaved:()=>void }){
  const [name,setName]=useState('');
  const [species,setSpecies]=useState('Кошка');
  const [sex,setSex]=useState('');
  const [birth,setBirth]=useState('');
  const [notes,setNotes]=useState('');
  const [msg,setMsg]=useState('');

  async function submit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setMsg('');
    const res = await fetch('/api/pets',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,species,sex,birth,notes})});
    const data = await res.json();
    if(res.ok){ setMsg('Сохранено'); setName(''); setSpecies('Кошка'); setSex(''); setBirth(''); setNotes(''); onSaved(); }
    else setMsg(data?.error || 'Ошибка');
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <div><label className="label">Имя</label><input className="input" value={name} onChange={e=>setName(e.target.value)} required/></div>
      <div><label className="label">Вид</label><select className="select" value={species} onChange={e=>setSpecies(e.target.value)}>
        {['Кошка','Собака','Птица','Грызун','Рептилия','Другое'].map(v=><option key={v} value={v}>{v}</option>)}
      </select></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Пол</label><select className="select" value={sex} onChange={e=>setSex(e.target.value)}>
          <option value="">Не указано</option><option>Самец</option><option>Самка</option></select></div>
        <div><label className="label">Дата рождения</label><input className="input" type="date" value={birth} onChange={e=>setBirth(e.target.value)} /></div>
      </div>
      <div><label className="label">Заметки</label><textarea className="textarea h-20" value={notes} onChange={e=>setNotes(e.target.value)} /></div>
      <div className="flex items-center gap-3">
        <button className="btn btn-primary">Добавить питомца</button>
        {msg && <span className="text-xs opacity-70">{msg}</span>}
      </div>
    </form>
  );
}
