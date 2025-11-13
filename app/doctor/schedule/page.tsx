// app/doctor/schedule/page.tsx
'use client';

import Schedule from '../../../components/doctor/Schedule';

export default function DoctorSchedulePage() {
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold mb-4">Расписание врача</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <Schedule />
      </div>
    </div>
  );
}
