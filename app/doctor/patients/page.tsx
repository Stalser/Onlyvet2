// app/doctor/patients/page.tsx
'use client';
import { patients } from '@/lib/doctor';
import PatientCard from '@/components/doctor/PatientCard';
export default function PatientsPage(){
  return <div className="grid lg:grid-cols-2 gap-4">{Object.values(patients).map(p => <PatientCard key={p.id} p={p} />)}</div>;
}
