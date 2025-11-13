// app/doctor/patients/page.tsx
'use client';

import { patients } from '../../../lib/doctor';
import PatientCard from '../../../components/doctor/PatientCard';

export default function DoctorPatientsPage() {
  return (
    <div className="container py-12 space-y-4">
      <h1 className="text-2xl font-semibold">Пациенты врача</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((p) => (
          <PatientCard key={p.id} patient={p} />
        ))}
      </div>
    </div>
  );
}
