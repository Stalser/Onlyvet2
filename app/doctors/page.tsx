// app/doctors/page.tsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { doctors } from '@/lib/data';

export default function DoctorsPage(){
  const [q,setQ]=useState('');
  const list = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if(!s) return doctors;
    return doctors.filter(d => d.name.toLowerCase().includes(s) || d.specialty.toLowerCase().includes(s));
  },[q]);

  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold" style={{fontFamily:'var(--font-montserrat)'}}>Все врачи</h1>
        <input className="input w-full sm:w-64" placeholder="Поиск по имени или специализации" value={q} onChange={e=>setQ(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {list.map(d => (
          <div key={d.id} className="card">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image src={d.photo} alt={d.name} width={56} height={56} className="rounded-full sm:w-[64px] sm:h-[64px]" />
              <div>
                <div className="font-semibold text-[15px] sm:text-base">{d.name}</div>
                <div className="text-xs sm:text-sm opacity-80">{d.specialty}</div>
                <div className="text-[11px] sm:text-xs opacity-60">Стаж: {d.experience} лет</div>
              </div>
            </div>
            <p className="text-sm opacity-80 mt-3">{d.bio}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link href={`/#doctors`} className="btn btn-secondary">Подробнее</Link>
              <Link href={`/booking?doctorId=${d.id}`} className="btn btn-primary">Записаться</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
