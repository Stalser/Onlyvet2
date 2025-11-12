// components/Doctors.tsx
'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { doctors } from '@/lib/data';
import DoctorDetailsModal from '@/components/DoctorDetailsModal';
import ScheduleModal from '@/components/ScheduleModal';
import { services } from '@/components/servicesData';

export default function Doctors() {
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [scheduleFor, setScheduleFor] = useState<string | null>(null);
  const doc = useMemo(() => doctors.find(d => d.id === detailsId), [detailsId]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(()=>{
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 640);
    check();
    window.addEventListener('resize', check, { passive: true } as any);
    return () => window.removeEventListener('resize', check as any);
  },[]);

  function chips(slugs?: string[]) {
    if (!slugs?.length) return null;
    const list = slugs.map(s => services.find(x => x.slug === s)).filter(Boolean).slice(0, 3) as {slug:string,name:string,icon?:string}[];
    return (
      <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
        {list.map(s => (
          <span key={s.slug} className="px-2 py-1 rounded-lg border bg-[var(--cloud)] text-[11px] sm:text-xs inline-flex items-center gap-1">
            <span>{s.icon ?? '🐾'}</span>
            <span className="truncate max-w-[9rem] sm:max-w-[10rem]">{s.name}</span>
          </span>
        ))}
      </div>
    );
  }

  const Card = ({ d }: { d: typeof doctors[number] }) => (
    <div className="card">
      <div className="flex items-center gap-3 sm:gap-4">
        <Image src={d.photo} alt={d.name} width={56} height={56} className="rounded-full sm:w-[64px] sm:h-[64px]" />
        <div>
          <div className="font-semibold text-[15px] sm:text-base">{d.name}</div>
          <div className="text-xs sm:text-sm opacity-80">{d.specialty}</div>
          <div className="text-[11px] sm:text-xs opacity-60">Стаж: {d.experience} лет</div>
        </div>
      </div>
      {chips(d.allowedServices)}
      <p className="text-sm opacity-80 mt-3 sm:mt-4 line-clamp-4 sm:line-clamp-none">{d.bio}</p>
      <div className="mt-3 sm:mt-4 grid grid-cols-2 gap-2">
        <button className="btn btn-secondary" onClick={()=>setDetailsId(d.id)}>Подробнее</button>
        <button className="btn btn-primary" onClick={()=>setScheduleFor(d.id)}>Записаться</button>
      </div>
    </div>
  );

  return (
    <section id="doctors" className="container py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10" style={{fontFamily: 'var(--font-montserrat)'}}>Наши врачи</h2>

      {/* Mobile: 1 карточка + кнопка "Все врачи" */}
      {isMobile ? (
        <>
          <Card d={doctors[0]} />
          <div className="mt-4">
            <Link href="/doctors" className="btn bg-white border border-gray-300 rounded-xl w-full">Смотреть всех врачей ({doctors.length})</Link>
          </div>
        </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {doctors.map((d)=> <Card key={d.id} d={d} />)}
        </div>
      )}

      {doc && <DoctorDetailsModal doctor={doc as any} onClose={()=>setDetailsId(null)} onBook={(id)=>{ setDetailsId(null); setScheduleFor(id); }} />}
      {scheduleFor && <ScheduleModal doctorId={scheduleFor} onClose={()=>setScheduleFor(null)} />}
    </section>
  );
}
