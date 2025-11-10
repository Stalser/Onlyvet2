'use client';
import { useEffect, useMemo, useState } from 'react';

type Slot = { date: string; time: string };

export default function ScheduleModal({ doctorId, onClose }:{ doctorId:string; onClose:()=>void }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentDay, setCurrentDay] = useState<string>('');

  const days = useMemo(()=>{
    const map = new Map<string, Slot[]>();
    for (const s of slots) {
      if (!map.has(s.date)) map.set(s.date, []);
      map.get(s.date)!.push(s);
    }
    return Array.from(map.entries()).map(([date, sl])=>({ date, slots: sl }));
  }, [slots]);

  useEffect(()=>{
    async function load(){
      try{
        const res = await fetch(`/api/schedule?doctorId=${doctorId}`);
        const data = await res.json();
        setSlots(data?.slots || []);
        if (data?.slots?.length) setCurrentDay(data.slots[0].date);
      }catch{ setError('Не удалось загрузить расписание.'); }
      finally{ setLoading(false); }
    }
    load();
  },[doctorId]);

  const selected = days.find(d => d.date === currentDay);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-soft max-w-xl w-full mx-4 p-6">
        <button className="absolute top-3 right-3 p-2" onClick={onClose} aria-label="Закрыть">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
        <div className="text-xl font-semibold mb-4">Выберите время</div>
        {loading && <div className="opacity-80 text-sm">Загрузка…</div>}
        {error && <div className="text-red-600 text-sm">{error}</div>}
        {!loading && !error && (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {days.map(d => (
                <button key={d.date} className={`px-3 py-2 rounded-xl border text-sm whitespace-nowrap ${currentDay===d.date?'bg-teal text-white border-teal':'bg-white border-gray-200 hover:bg-cloud'}`} onClick={()=>setCurrentDay(d.date)}>
                  {new Date(d.date).toLocaleDateString('ru-RU',{weekday:'short', day:'2-digit', month:'short'})}
                </button>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {selected?.slots.map(s => (
                <a key={s.time} className="border rounded-xl px-3 py-2 text-sm text-center hover:bg-cloud" href={`/booking?doctorId=${doctorId}&date=${selected.date}&time=${s.time}`}>
                  {s.time}
                </a>
              )) || <div className="opacity-80 text-sm">Нет свободных слотов.</div>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
