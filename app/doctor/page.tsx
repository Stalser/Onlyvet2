// app/doctor/page.tsx
'use client';
import Schedule from '@/components/doctor/Schedule';
import AppointmentsList from '@/components/doctor/AppointmentsList';
import { getDoctorSession } from '@/lib/doctor';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DoctorHome(){
  const router = useRouter();
  useEffect(()=>{
    const user = getDoctorSession()?.user;
    if(!user) router.replace('/auth/doctor');
  }, [router]);

  return (
    <div className="space-y-4">
      <Schedule />
      <AppointmentsList />
    </div>
  );
}
