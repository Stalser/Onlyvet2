'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { doctors } from '@/lib/data';
import DoctorModal from '@/components/DoctorModal';

export default function Doctors() {
  const [openId, setOpenId] = useState<string | null>(null);
  const doc = doctors.find(d => d.id === openId);

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
              <button className="btn btn-secondary flex-1" onClick={()=>setOpenId(d.id)}>Подробнее</button>
              <Link href={`/booking?doctorId=${d.id}`} className="btn btn-primary">Записаться</Link>
            </div>
          </div>
        ))}
      </div>

      {doc && <DoctorModal doctor={doc as any} onClose={()=>setOpenId(null)} />}
    </section>
  );
}
