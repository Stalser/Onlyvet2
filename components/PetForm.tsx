// components/PetForm.tsx
'use client';
import { useState } from 'react';
import { Pet } from '@/lib/account';

export default function PetForm({onSave}:{onSave:(pet:Pet)=>void}){
  const [name,setName]=useState('');
  const [species,setSpecies]=useState('Кошка');
  const [sex,setSex]=useState('');
  const [birth,setBirth]=useState('');
  const [notes,setNotes]=useState('');
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSave({id:crypto.randomUUID(), name, species, sex, birth, notes});}} className="grid gap-3">
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
      <div><button className="btn btn-primary">Добавить питомца</button></div>
    </form>
  );
}
