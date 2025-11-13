// app/doctor/appointments/page.tsx
'use client';

import WeeklyGrid from '../../../components/doctor/WeeklyGrid';
import { getDoctorAppointments } from '../../../lib/doctor';
import { useEffect, useState } from 'react';

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const list = await getDoctorAppointments("1"); // временный врач
      setAppointments(list);
    }
    load();
  }, []);

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-semibold mb-4">Записи врача</h1>

      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <WeeklyGrid appointments={appointments} />
      </div>
    </div>
  );
}
