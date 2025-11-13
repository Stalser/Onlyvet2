// app/doctor/page.tsx
'use client';

import Schedule from '../../components/doctor/Schedule';
import AppointmentsList from '../../components/doctor/AppointmentsList';

export default function DoctorDashboardPage() {
  return (
    <div className="container py-12 space-y-6">
      <h1 className="text-2xl font-semibold">Кабинет врача</h1>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="font-medium mb-3">Расписание</h2>
          <Schedule />
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4">
          <h2 className="font-medium mb-3">Ближайшие приёмы</h2>
          <AppointmentsList />
        </div>
      </div>
    </div>
  );
}
