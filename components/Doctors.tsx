'use client';
import Image from 'next/image';
import { useState } from 'react';
import { doctors } from '@/lib/data';
import DoctorDetailsModal from '@/components/DoctorDetailsModal';
import ScheduleModal from '@/components/ScheduleModal';

export default function Doctors() {
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [scheduleFor, setScheduleFor] = useState<string | null>(null);
  const doc = doctors.find(d => d.id === detailsId);

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
            <p className="text-sm opacity-80 mt-4">{d.bio}</p>
            <div className="mt-4 flex gap-3">
              <button className="btn btn-secondary flex-1" onClick={()=>setDetailsId(d.id)}>Подробнее</button>
              <button className="btn btn-primary" onClick={()=>setScheduleFor(d.id)}>Записаться</button>
            </div>
          </div>
        ))}
      </div>
      {doc && <DoctorDetailsModal doctor={doc as any} onClose={()=>setDetailsId(null)} onBook={(id)=>{ setDetailsId(null); setScheduleFor(id); }}/>}      
      {scheduleFor && <ScheduleModal doctorId={scheduleFor} onClose={()=>setScheduleFor(null)} />}
    </section>
  );
}
