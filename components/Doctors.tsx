
// components/Doctors.tsx
'use client';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { doctors } from '@/lib/data';
import DoctorDetailsModal from '@/components/DoctorDetailsModal';
import ScheduleModal from '@/components/ScheduleModal';
import { services } from '@/components/servicesData';

export default function Doctors() {
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [scheduleFor, setScheduleFor] = useState<string | null>(null);
  const doc = useMemo(()=> doctors.find(d => d.id === detailsId), [detailsId]);

  function getServiceChips(slugs?: string[]) {
    if (!slugs || !slugs.length) return [];
    return slugs
      .map(s => services.find(x => x.slug === s))
      .filter(Boolean)
      .slice(0, 3) as {slug:string, name:string, icon?:string}[];
  }

  return (
    <section id="doctors" className="container py-16">
      <h2 className="text-3xl font-bold mb-10" style={{fontFamily: 'var(--font-montserrat)'}}>Наши врачи</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((d) => (
          <div key={d.id} className="card">
            <div className="flex items-center gap-4">
              <Image src={d.photo} alt={d.name} width={64} height={64} className="rounded-full" />
              <div>
                <div className="font-semibold">{d.name}</div>
                <div className="text-sm opacity-80">{d.specialty}</div>
                <div className="text-xs opacity-60">Стаж: {d.experience} лет</div>
              </div>
            </div>

            {d.allowedServices && d.allowedServices.length>0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {getServiceChips(d.allowedServices).map(s => (
                  <span key={s.slug} className="px-2 py-1 rounded-lg border bg-[var(--cloud)] text-xs inline-flex items-center gap-1">
                    <span>{s.icon ?? '🐾'}</span>
                    <span className="truncate max-w-[10rem]">{s.name}</span>
                  </span>
                ))}
              </div>
            )}

            <p className="text-sm opacity-80 mt-4">{d.bio}</p>
            <div className="mt-4 flex gap-3">
              <button className="btn btn-secondary flex-1" onClick={()=>setDetailsId(d.id)}>Подробнее</button>
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
