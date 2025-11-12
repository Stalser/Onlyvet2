// components/doctor/AppointmentActions.tsx
'use client';
import { useState } from 'react';
export default function AppointmentActions({ id }:{ id: string }){
  const [status, setStatus] = useState<'scheduled'|'done'|'cancelled'>('scheduled');
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="font-semibold mb-2" style={{color:'var(--navy)'}}>Статус приёма</div>
      <div className="flex flex-wrap gap-2">
        <button className={`btn ${status==='scheduled'?'btn-primary':'bg-white border border-gray-300'} rounded-xl px-3`} onClick={()=>setStatus('scheduled')}>Запланирован</button>
        <button className={`btn ${status==='done'?'btn-primary':'bg-white border border-gray-300'} rounded-xl px-3`} onClick={()=>setStatus('done')}>Завершён</button>
        <button className={`btn ${status==='cancelled'?'btn-primary':'bg-white border border-gray-300'} rounded-xl px-3`} onClick={()=>setStatus('cancelled')}>Отменён</button>
      </div>
      <div className="text-xs opacity-70 mt-2">Демо: статус хранится локально. Подключим API при интеграции CRM.</div>
    </div>
  );
}
