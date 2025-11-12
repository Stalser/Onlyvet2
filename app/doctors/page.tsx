// app/doctors/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { doctors } from '@/lib/data';
import { services } from '@/components/servicesData';

export default function DoctorsPage(){
  const [q, setQ] = useState('');
  const [spec, setSpec] = useState('');
  const [service, setService] = useState('');

  const specialties = useMemo(() => {
    return Array.from(new Set(doctors.map(d => d.specialty))).sort();
  }, []);

  const serviceOptions = useMemo(() => {
    return services.map(s => ({ slug: s.slug, name: s.name }));
  }, []);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return doctors.filter(d => {
      const byQ = !s || d.name.toLowerCase().includes(s) || d.specialty.toLowerCase().includes(s);
      const bySpec = !spec || d.specialty === spec;
      const byService = !service || d.allowedServices?.includes(service);
      return byQ && bySpec && byService;
    });
  }, [q, spec, service]);

  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold" style={{fontFamily:'var(--font-montserrat)'}}>Все врачи</h1>
        <div className="text-sm opacity-70">Найдено: {list.length}</div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <label className="label">Поиск</label>
            <input className="input" placeholder="Имя врача или специализация" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <div>
            <label className="label">Специальность</label>
            <select className="select" value={spec} onChange={e=>setSpec(e.target.value)}>
              <option value="">Все специальности</option>
              {specialties.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Услуга</label>
            <select className="select" value={service} onChange={e=>setService(e.target.value)}>
              <option value="">Все услуги</option>
              {serviceOptions.map(s => <option key={s.slug} value={s.slug}>{s.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {list.map(d => (
          <div key={d.id} className="card">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image src={d.photo} alt={d.name} width={64} height={64} className="rounded-full" />
              <div>
                <div className="font-semibold">{d.name}</div>
                <div className="text-sm opacity-80">{d.specialty}</div>
                <div className="text-xs opacity-60">Стаж: {d.experience} лет</div>
              </div>
            </div>

            <p className="text-sm opacity-80 mt-3">{d.bio}</p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link href={`/#doctors`} className="btn btn-secondary">Подробнее</Link>
              <Link href={`/booking?doctorId=${d.id}`} className="btn btn-primary">Записаться</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
