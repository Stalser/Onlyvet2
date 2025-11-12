// app/doctor/settings/page.tsx
'use client';
import { getDoctorSession, clearDoctorSession } from '@/lib/doctor';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage(){
  const router = useRouter();
  useEffect(()=>{ if(!getDoctorSession()?.user) router.replace('/auth/doctor'); }, [router]);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h3 className="font-semibold mb-3" style={{color:'var(--navy)'}}>Настройки</h3>
      <p className="opacity-80 text-sm">Здесь будут настройки профиля врача, интеграции (Vetmanager), рабочие статусы и т.д.</p>
      <button className="btn bg-white border border-gray-300 rounded-xl px-3 mt-3" onClick={async ()=>{ clearDoctorSession(); await fetch('/api/doctor/session',{method:'DELETE'}); router.replace('/auth/doctor');}}>Выйти</button>
    </div>
  );
}
