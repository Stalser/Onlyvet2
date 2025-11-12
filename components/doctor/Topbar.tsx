// components/doctor/Topbar.tsx
'use client';
import { clearDoctorSession, getDoctorSession } from '@/lib/doctor';
import { useRouter } from 'next/navigation';

export default function Topbar(){
  const router = useRouter();
  const logout = () => { clearDoctorSession(); router.replace('/auth/doctor'); };
  const user = typeof window!=='undefined' ? getDoctorSession()?.user : undefined;
  return (
    <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-4 rounded-xl">
      <div className="font-semibold" style={{color:'var(--navy)'}}>OnlyVet — Панель врача</div>
      <div className="flex items-center gap-3 text-sm">
        {user && <span className="opacity-80">{user.name} · {user.specialty}</span>}
        <button className="btn bg-white border border-gray-300 rounded-xl px-3" onClick={()=>router.push('/doctor/schedule')}>График</button>
        <button className="btn btn-primary rounded-xl px-3" onClick={logout}>Выйти</button>
      </div>
    </div>
  );
}
