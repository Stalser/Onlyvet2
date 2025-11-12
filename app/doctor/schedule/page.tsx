// app/doctor/schedule/page.tsx
'use client';
import Schedule from '@/components/doctor/Schedule';
import { getDoctorSession } from '@/lib/doctor';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DoctorSchedule(){
  const router = useRouter();
  useEffect(()=>{ if(!getDoctorSession()?.user) router.replace('/auth/doctor'); }, [router]);
  return <Schedule />;
}
