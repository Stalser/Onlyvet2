// app/doctors/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { doctors, getDoctorById } from '../../../lib/data';
import { getDoctorSchedule } from '../../../lib/doctorSchedule';
import { getDoctorPricing } from '../../../lib/pricing';
import Stars from '../../../components/Stars';

export default function DoctorPublicPage() {
  const { id } = useParams<{ id: string }>();
  const doctor = getDoctorById(id as string);

  if (!doctor) {
    return (
      <div className="container py-12">
        <h1 className="text-2xl font-semibold mb-4">Врач не найден</h1>
      </div>
    );
  }

  const schedule = getDoctorSchedule(doctor.id);
  const pricing = getDoctorPricing(doctor.id);

  return (
    <div className="container py-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{doctor.name}</h1>
          <div className="text-gray-600 text-sm mt-1">{doctor.speciality}</div>
          <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
            <Stars value={doctor.rating ?? 5} />
            <span>{doctor.rating?.toFixed(1) ?? '5.0'}</span>
          </div>
        </div>
        <button className="px-4 py-2 rounded-xl bg-black text-white text-sm">
          Записаться на консультацию
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="font-medium mb-2">О враче</h2>
            <p className="text-sm text-gray-700">
              {doctor.bio ||
                'Здесь будет расширенное описание врача, его подходы и опыт работы.'}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="font-medium mb-2">Ближайшие слоты</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {schedule.map((slot) => (
                <li key={slot.id} className="flex justify-between">
                  <span>{slot.label}</span>
                  <span className="text-xs text-gray-500">{slot.type}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <h2 className="font-medium mb-2">Услуги и цены</h2>
            <ul className="text-sm text-gray-700 space-y-1">
              {pricing.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-xs text-gray-500">{item.price} ₽</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
