// components/doctor/Schedule.tsx
'use client';
import { appointments, patients } from '@/lib/doctor';

function fmt(dt: string){
  const d = new Date(dt);
  return d.toLocaleString('ru-RU', { dateStyle:'short', timeStyle:'short' });
}

export default function Schedule(){
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h3 className="font-semibold mb-3" style={{color:'var(--navy)'}}>Ближайшие консультации</h3>
      <div className="space-y-2">
        {appointments.map(a=>{
          const p = patients[a.patientId];
          return (
            <div key={a.id} className="flex items-center justify-between gap-3 border rounded-xl p-3">
              <div>
                <div className="font-medium">{fmt(a.startsAt)} — {fmt(a.endsAt)}</div>
                <div className="text-sm opacity-80">{p?.name} · {a.service} · канал: {a.channel}</div>
              </div>
              <div className="flex gap-2">
                <a className="btn btn-primary rounded-xl px-3" href={`/doctor/appointment/${a.id}`}>Открыть</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
