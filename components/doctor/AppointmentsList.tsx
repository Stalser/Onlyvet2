// components/doctor/AppointmentsList.tsx
'use client';
import { appointments, patients } from '@/lib/doctor';
function fmtTime(dt: string){ return new Date(dt).toLocaleTimeString('ru-RU', {hour:'2-digit', minute:'2-digit'}); }
export default function AppointmentsList(){
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h3 className="font-semibold mb-3" style={{color:'var(--navy)'}}>Сегодня</h3>
      <div className="space-y-2">
        {appointments.map(a=>{
          const p = patients[a.patientId];
          return (
            <div key={a.id} className="flex items-center justify-between gap-3 border rounded-xl p-3">
              <div>
                <div className="font-medium">{fmtTime(a.startsAt)}–{fmtTime(a.endsAt)} · {a.service}</div>
                <div className="text-sm opacity-80">{p?.name} · {p?.owner?.name}</div>
              </div>
              <a className="btn bg-white border border-gray-300 rounded-xl px-3" href={`/doctor/appointment/${a.id}`}>Открыть карту</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
