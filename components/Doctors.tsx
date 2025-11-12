// components/Doctors.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { doctors } from '@/lib/data';
import { services } from '@/components/servicesData';
import DoctorDetailsModal from '@/components/DoctorDetailsModal';
import ScheduleModal from '@/components/ScheduleModal';

export default function Doctors() {
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [scheduleFor, setScheduleFor] = useState<string | null>(null);
  const doc = useMemo(()=> doctors.find(d => d.id === detailsId), [detailsId]);

  function chips(slugs?: string[]) {
    if (!slugs?.length) return null;
    const list = slugs.map(s => services.find(x => x.slug === s)).filter(Boolean).slice(0, 3) as {slug:string,name:string,icon?:string}[];
    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {list.map(s => (
          <span key={s.slug} className="px-2 py-1 rounded-lg border bg-[var(--cloud)] text-xs inline-flex items-center gap-1">
            <span>{s.icon ?? '🐾'}</span>
            <span className="truncate max-w-[10rem]">{s.name}</span>
          </span>
        ))}
  <Link href="/docs" >Документы</Link>
</div>
    );
  }

  return (
    <section id="doctors" className="container py-12 sm:py-16">
      <div className="mb-6 flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{fontFamily:'var(--font-montserrat)'}}>Наши врачи</h2>
        <Link href="/doctors" className="btn bg-white border border-gray-300 rounded-xl px-4">Смотреть всех</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {doctors.slice(0,6).map((d) => (
          <div key={d.id} className="card">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image src={d.photo} alt={d.name} width={64} height={64} className="rounded-full" />
              <div>
                <div className="font-semibold">{d.name}</div>
                <div className="text-sm opacity-80">{d.specialty}</div>
                <div className="text-xs opacity-60">Стаж: {d.experience} лет</div>
              </div>
            </div>
            {chips(d.allowedServices)}
            <p className="text-sm opacity-80 mt-3">{d.bio}</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="btn btn-secondary" onClick={()=>setDetailsId(d.id)}>Подробнее</button>
              <button className="btn btn-primary" onClick={()=>setScheduleFor(d.id)}>Записаться</button>
            </div>
          </div>
        ))}
      </div>

      {doc && <DoctorDetailsModal doctor={doc as any} onClose={()=>setDetailsId(null)} onBook={(id)=>{ setDetailsId(null); setScheduleFor(id); }} />}
      {scheduleFor && <ScheduleModal doctorId={scheduleFor} onClose={()=>setScheduleFor(null)} />}
    </section>
  );
}
