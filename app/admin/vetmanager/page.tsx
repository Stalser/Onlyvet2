// app/admin/vetmanager/page.tsx
'use client';
import { useState } from 'react';
export default function VetmanagerSettings(){
  const [out, setOut] = useState<string>('');
  const ping = async ()=>{ try{ const res = await fetch('/api/vetmanager/ping'); const data = await res.json(); setOut(JSON.stringify(data,null,2)); }catch(e){ setOut('error'); } };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h1 className="text-2xl font-semibold mb-2" style={{color:'var(--navy)'}}>Интеграция Vetmanager</h1>
      <div className="opacity-80 text-sm mb-4">
        Добавьте в переменные окружения Vercel:<br/>
        <code>VETMANAGER_BASE_URL=https://your-domain/v2</code><br/>
        <code>VETMANAGER_TOKEN=***</code>
      </div>
      <button className="btn bg-white border border-gray-300 rounded-xl px-3" onClick={ping}>Проверить соединение</button>
      <pre className="mt-4 text-xs bg-[var(--cloud)] p-3 rounded-xl whitespace-pre-wrap">{out}</pre>
    </div>
  );
}
