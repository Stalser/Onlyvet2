// app/doctor/patients/page.tsx
'use client';
import { patients } from '@/lib/doctor';
import PatientCard from '@/components/doctor/PatientCard';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getDoctorSession } from '@/lib/doctor';

export default function PatientsPage(){
  const router = useRouter();
  useEffect(()=>{ if(!getDoctorSession()?.user) router.replace('/auth/doctor'); }, [router]);
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {Object.values(patients).map(p => <PatientCard key={p.id} p={p} />)}
    </div>
  );
}
