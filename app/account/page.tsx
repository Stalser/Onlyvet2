// app/account/page.tsx
'use client';
import { useEffect, useState } from 'react';
import AccountNav from '@/components/AccountNav';
import PetForm from '@/components/PetForm';
import { loadAccount, saveAccount, newId, User, Pet, Consultation } from '@/lib/account';

export default function AccountPage(){
  const [user,setUser]=useState<User|undefined>();
  const [pets,setPets]=useState<Pet[]>([]);
  const [consultations,setConsultations]=useState<Consultation[]>([]);

  useEffect(()=>{
    const acc = loadAccount();
    setUser(acc.user); setPets(acc.pets); setConsultations(acc.consultations);
  },[]);

  function addPet(p:Pet){
    const next = { user, pets:[...pets, p], consultations };
    saveAccount(next); setPets(next.pets);
  }

  return (
    <section className="container py-16">
      <AccountNav current="/account"/>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <h2 className="text-xl font-semibold mb-4">Профиль</h2>
          {user ? (
            <div className="text-sm opacity-90">
              <div><b>Имя:</b> {user.name}</div>
              <div><b>Email:</b> {user.email}</div>
              <p className="text-xs opacity-70 mt-2">Демо-режим: данные хранятся локально в вашем браузере.</p>
            </div>
          ) : (
            <p className="text-sm opacity-80">Вы не авторизованы. Перейдите на /auth/register или /auth/login.</p>
          )}
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-4" id="pets">Добавить питомца</h2>
          <PetForm onSave={addPet}/>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="card">
          <h3 className="text-lg font-semibold mb-3">Мои питомцы</h3>
          {pets.length===0 ? <p className="text-sm opacity-80">Пока нет питомцев.</p> :
            <ul className="grid gap-3">
              {pets.map(p=> (
                <li key={p.id} className="rounded-xl border p-3">
                  <div className="font-medium">{p.name} — {p.species}</div>
                  <div className="text-xs opacity-70">{p.sex || 'пол не указан'}{p.birth ? ` · рожд. ${p.birth}` : ''}</div>
                  {p.notes && <div className="text-sm opacity-80 mt-1">{p.notes}</div>}
                </li>
              ))}
            </ul>
          }
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold mb-3" id="consultations">История консультаций</h3>
          {consultations.length===0 ? <p className="text-sm opacity-80">История пока пустая.</p> :
            <ul className="grid gap-3">
              {consultations.map(c=> (
                <li key={c.id} className="rounded-xl border p-3">
                  <div className="font-medium">{c.date} — {c.service || 'консультация'} {c.doctorName ? `· ${c.doctorName}` : ''}</div>
                  {c.summary && <div className="text-sm mt-1">{c.summary}</div>}
                  {c.recommendations && <div className="text-xs opacity-70 mt-1">Рекомендации: {c.recommendations}</div>}
                </li>
              ))}
            </ul>
          }
        </div>
      </div>
    </section>
  );
}
