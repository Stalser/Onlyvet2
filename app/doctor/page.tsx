// app/doctor/page.tsx
'use client';
import Schedule from '@/components/doctor/Schedule';
import AppointmentsList from '@/components/doctor/AppointmentsList';
export default function DoctorHome(){
  return (
    <div className="space-y-4">
      <Schedule />
      <AppointmentsList />
    </div>
  );
}
