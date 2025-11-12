// components/doctor/WeeklyGrid.tsx
'use client';
import { appointments, patients } from '@/lib/doctor';

type Cell = { time: string; appts: string[] };

function fmtHM(d: Date){ return d.toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'}); }
function toDayKey(d: Date){ return d.toISOString().slice(0,10); }

export default function WeeklyGrid(){
  const start = new Date();
  const week: Date[] = Array.from({length:7}, (_,i)=>new Date(start.getFullYear(), start.getMonth(), start.getDate()+i));
  const hours = [9,10,11,12,13,14,15,16,17,18];

  const grid: Record<string, Cell[]> = {};
  for(const day of week){
    const dayKey = toDayKey(day);
    grid[dayKey] = hours.map(h=>({ time: fmtHM(new Date(day.getFullYear(), day.getMonth(), day.getDate(), h, 0)), appts: [] }));
  }
  for(const a of appointments){
    const d = new Date(a.startsAt);
    const dayKey = toDayKey(d);
    if(grid[dayKey]){
      const hour = d.getHours();
      const idx = hours.indexOf(hour);
      if(idx>=0){
        const p = patients[a.patientId];
        grid[dayKey][idx].appts.push(`${p?.name||'Пациент'} · ${a.service} · ${a.channel}`);
      }
    }
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 overflow-x-auto">
      <div className="min-w-[720px]">
        <div className="grid" style={{gridTemplateColumns:`120px repeat(7, 1fr)`}}>
          <div></div>
          {week.map(d=>(<div key={d.toISOString()} className="text-sm font-semibold" style={{color:'var(--navy)'}}>
            {d.toLocaleDateString('ru-RU',{weekday:'short', day:'2-digit', month:'2-digit'})}
          </div>))}
          {hours.map((h,ri)=>{
            const rowTime = fmtHM(new Date(2020,1,1,h,0));
            return (
              <>
                <div key={`t-${ri}`} className="text-xs opacity-70 py-2">{rowTime}</div>
                {week.map((d,ci)=>{
                  const dayKey = toDayKey(d);
                  const cell = grid[dayKey][ri];
                  return (
                    <div key={`c-${ci}-${ri}`} className="border rounded-lg p-2 min-h-[56px]">
                      {cell.appts.map((txt,i)=>(<div key={i} className="text-xs">{txt}</div>))}
                    </div>
                  );
                })}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
