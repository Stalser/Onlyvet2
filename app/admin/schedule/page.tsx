// app/admin/schedule/page.tsx
'use client';

import { doctors } from '../../../lib/data';
import { getDoctorSchedule } from '../../../lib/doctorSchedule';

export default function AdminSchedulePage() {
  const doctor = doctors[0];
  const schedule = getDoctorSchedule(doctor.id);

  return (
    <div className="container py-12 space-y-4">
      <h1 className="text-2xl font-semibold">Расписание врачей (админ)</h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2 text-sm text-gray-800">
        <div className="font-medium mb-2">{doctor.name}</div>
        {schedule.map((slot) => (
          <div
            key={slot.id}
            className="flex items-center justify-between border-b last:border-b-0 border-gray-100 pb-2 last:pb-0"
          >
            <span>{slot.label}</span>
            <span className="text-xs text-gray-500">{slot.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
