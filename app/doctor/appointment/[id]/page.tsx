// app/doctor/appointment/[id]/page.tsx
'use client';
import { useParams, useRouter } from 'next/navigation';
import { appointments, patients } from '@/lib/doctor';
import { useEffect, useMemo, useState } from 'react';
import { getDoctorSession } from '@/lib/doctor';
import AppointmentActions from '@/components/doctor/AppointmentActions';

function fmt(dt: string){ return new Date(dt).toLocaleString('ru-RU', { dateStyle:'short', timeStyle:'short' }); }

export default function AppointmentDetail(){
  const { id } = useParams<{id:string}>();
  const router = useRouter();
  const [note, setNote] = useState('');

  useEffect(()=>{ if(!getDoctorSession()?.user) router.replace('/auth/doctor'); }, [router]);

  const a = useMemo(()=> appointments.find(x=>x.id===id), [id]);
  const p = a ? patients[a.patientId] : undefined;
  if(!a || !p) return <section className="container py-12">Запись не найдена</section>;

  return (
    <section className="container py-12">
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-semibold mb-2" style={{color:'var(--navy)'}}>Запись {a.id}</div>
            <div className="text-sm opacity-80">{fmt(a.startsAt)} — {fmt(a.endsAt)} · {a.service} · канал: {a.channel}</div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-semibold mb-2" style={{color:'var(--navy)'}}>Заметки врача</div>
            <textarea className="input w-full min-h-[120px]" placeholder="Рекомендации, назначения, контроль..." value={note} onChange={e=>setNote(e.target.value)} />
            <div className="mt-3 flex gap-2">
              <button className="btn btn-primary rounded-xl px-4" onClick={()=>alert('Сохранено (демо)')}>Сохранить</button>
              <button className="btn bg-white border border-gray-300 rounded-xl px-4" onClick={()=>setNote('')}>Очистить</button>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-semibold mb-2" style={{color:'var(--navy)'}}>Файлы от клиента (демо)</div>
            <input type="file" multiple className="input" onChange={(e)=>alert(`${e.target.files?.length||0} файл(ов) выбран(о) — демо`)}/>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-semibold mb-2" style={{color:'var(--navy)'}}>Пациент</div>
            <div className="text-sm"><b>{p.name}</b> · {p.species} {p.breed? '· '+p.breed : ''}</div>
            <div className="text-sm opacity-80">Возраст: {p.age||'—'} · Вес: {p.weightKg||'—'} кг</div>
            {p.owner && <div className="text-sm mt-2">Владелец: {p.owner.name}{p.owner.phone? ' · '+p.owner.phone : ''}</div>}
          </div>
          <AppointmentActions id={a.id} />
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-semibold mb-2" style={{color:'var(--navy)'}}>Быстрые действия</div>
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-primary rounded-xl px-3" onClick={()=>alert('Открыть видеозвонок (демо)')}>Начать видео</button>
              <button className="btn bg-white border border-gray-300 rounded-xl px-3" onClick={()=>alert('Открыть чат (демо)')}>Открыть чат</button>
              <button className="btn bg-white border border-gray-300 rounded-xl px-3" onClick={()=>alert('Экспорт PDF (демо)')}>Экспорт PDF</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
