// app/account/page.tsx
'use client';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import PullToRefresh from "../../components/PullToRefresh";
import Reveal from "../../components/Reveal";

type Pet = { id:number; name:string; species?:string; sex?:string; birth?:string; notes?:string };
type Consultation = { id:number; date:string; doctor_name?:string; service?:string; summary?:string; recommendations?:string };

export default function AccountPage(){
  const [pets,setPets]=useState<Pet[]>([]);
  const [cons,setCons]=useState<Consultation[]>([]);
  const [loading,setLoading]=useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [p,c] = await Promise.all([ fetch('/api/pets'), fetch('/api/consultations') ]);
    if(p.status===401 || c.status===401){ window.location.href='/auth/login'; return; }
    const pd = await p.json().catch(()=>({items:[]})); const cd = await c.json().catch(()=>({items:[]}));
    setPets(pd.items||[]); setCons(cd.items||[]); setLoading(false);
  }, []);

  useEffect(()=>{ load(); },[load]);

  return (
    <PullToRefresh onRefresh={load}>
      <section className="container py-12 sm:py-16">
        <div className="mb-4 sm:mb-6 flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{fontFamily:'var(--font-montserrat)'}}>Личный кабинет</h1>
          <Link href="/booking" className="btn btn-primary hidden sm:inline-flex">Записаться</Link>
        </div>

        {loading ? <p>Загрузка…</p> : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <Reveal>
              <div className="card">
                <h2 className="text-lg sm:text-xl font-semibold mb-3">Мои питомцы</h2>
                {pets.length===0 ? <p className="text-sm opacity-80">Пока нет питомцев.</p> :
                  <ul className="grid gap-3">
                    {pets.map(p=> (
                      <li key={p.id} className="rounded-xl border p-3">
                        <div className="font-medium">{p.name} — {p.species||'—'}</div>
                        <div className="text-xs opacity-70">{p.sex||'пол не указан'}{p.birth ? ` · рожд. ${p.birth}` : ''}</div>
                        {p.notes && <div className="text-sm opacity-80 mt-1">{p.notes}</div>}
                      </li>
                    ))}
                  </ul>
                }
              </div>
            </Reveal>

            <Reveal>
              <div className="card">
                <h2 className="text-lg sm:text-xl font-semibold mb-3">История консультаций</h2>
                {cons.length===0 ? <p className="text-sm opacity-80">История пока пустая.</p> :
                  <ul className="grid gap-3">
                    {cons.map(c=> (
                      <li key={c.id} className="rounded-xl border p-3">
                        <div className="font-medium">{c.date} — {c.service||'консультация'} {c.doctor_name ? `· ${c.doctor_name}` : ''}</div>
                        {c.summary && <div className="text-sm mt-1">{c.summary}</div>}
                        {c.recommendations && <div className="text-xs opacity-70 mt-1">Рекомендации: {c.recommendations}</div>}
                      </li>
                    ))}
                  </ul>
                }
              </div>
            </Reveal>
          </div>
        )}

        <div className="sm:hidden fixed inset-x-0 bottom-0 z-40 bg-white border-t p-3 [padding-bottom:calc(env(safe-area-inset-bottom))]">
          <Link href="/booking" className="btn btn-primary w-full">Записаться</Link>
        </div>
      </section>
    </PullToRefresh>
  );
}
