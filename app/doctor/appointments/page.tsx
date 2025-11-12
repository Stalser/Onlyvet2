// app/doctor/appointments/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDoctorSession } from '@/lib/doctor';
import WeeklyGrid from '@/components/doctor/WeeklyGrid';

export default function AppointmentsPage(){
  const router = useRouter();
  useEffect(()=>{ if(!getDoctorSession()?.user) router.replace('/auth/doctor'); }, [router]);
  return (
    <div className="space-y-4">
      <WeeklyGrid />
    </div>
  );
}
