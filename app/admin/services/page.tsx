// app/admin/services/page.tsx
'use client';
import { useEffect, useMemo, useState } from 'react';
import { doctors as baseDoctors } from '@/lib/data';
import { services } from '@/components/servicesData';

type Doc = typeof baseDoctors[number];

export default function AdminServicesMapPage(){
  // загружаем кастомные соответствия из localStorage
  const [overrides, setOverrides] = useState<Record<string,string[]>>({});

  useEffect(()=>{
    try{
      const raw = localStorage.getItem('onlyvet:doctorServices');
      if(raw) setOverrides(JSON.parse(raw));
    }catch{}
  },[]);

  const doctors: Doc[] = useMemo(()=>{
    return baseDoctors.map(d => ({
      ...d,
      allowedServices: overrides[d.id] ?? d.allowedServices ?? []
    }));
  }, [overrides]);

  function toggle(docId: string, slug: string){
    setOverrides(prev => {
      const next = { ...prev };
      const arr = new Set<string>(next[docId] ?? (baseDoctors.find(d=>d.id===docId)?.allowedServices ?? []));
      if(arr.has(slug)) arr.delete(slug); else arr.add(slug);
      next[docId] = Array.from(arr);
      localStorage.setItem('onlyvet:doctorServices', JSON.stringify(next));
      return next;
    });
  }

  function resetDoc(docId: string){
    setOverrides(prev => {
      const next = { ...prev };
      delete next[docId];
      localStorage.setItem('onlyvet:doctorServices', JSON.stringify(next));
      return next;
    });
  }

  function exportJSON(){
    const data = JSON.stringify(overrides, null, 2);
    const blob = new Blob([data], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'onlyvet_doctor_services.json'; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-6" style={{fontFamily:'var(--font-montserrat)'}}>Админка — услуги по врачам</h1>

      <div className="card mb-6">
        <div className="flex items-center gap-3">
          <button className="btn btn-secondary" onClick={exportJSON}>Экспорт настроек</button>
          <p className="text-sm opacity-80">Изменения сохраняются в браузере (демо). Для продакшна подключим БД или Vetmanager.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {doctors.map(d => (
          <div key={d.id} className="card">
            <div className="font-semibold">{d.name}</div>
            <div className="text-sm opacity-80 mb-3">{d.specialty}</div>
            <div className="grid md:grid-cols-2 gap-2">
              {services.map(s => {
                const checked = (overrides[d.id] ?? d.allowedServices ?? []).includes(s.slug);
                return (
                  <label key={s.slug} className={`px-3 py-2 rounded-xl border cursor-pointer ${checked ? 'bg-[var(--teal)] text-white border-[var(--teal)]' : 'bg-white border-gray-200 hover:bg-[var(--cloud)]'}`}>
                    <input type="checkbox" checked={checked} onChange={()=>toggle(d.id, s.slug)} className="mr-2" />
                    {s.emoji ?? '🐾'} {s.name}
                  </label>
                );
              })}
            </div>
            <div className="mt-3">
              <button className="btn btn-secondary" onClick={()=>resetDoc(d.id)}>Сбросить по умолчанию</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
