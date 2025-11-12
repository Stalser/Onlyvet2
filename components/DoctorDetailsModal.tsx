// components/DoctorDetailsModal.tsx
'use client';
import Image from 'next/image';
import { services } from '@/components/servicesData';

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  bio: string;
  photo: string;
  interests?: string[];
  languages?: string[];
  education?: string[];
  achievements?: string[];
  publications?: string[];
  allowedServices?: string[];
};

export default function DoctorDetailsModal({
  doctor,
  onClose,
  onBook
}: { doctor: Doctor; onClose: () => void; onBook: (doctorId: string) => void }) {

  const doctorServices = (doctor.allowedServices || [])
    .map(slug => services.find(s => s.slug === slug))
    .filter(Boolean) as { slug: string; name: string; price?: string; duration?: string; icon?: string }[];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-soft w-full max-w-3xl mx-0 sm:mx-4 p-4 sm:p-6 overflow-y-auto max-h-[100vh] sm:max-h-[90vh]">
        <button className="absolute top-3 right-3 p-2 rounded-xl hover:bg-[var(--cloud)]" onClick={onClose} aria-label="Закрыть">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
        </button>

        <div className="grid sm:grid-cols-[160px_1fr] gap-4 sm:gap-6 items-start">
          <div className="relative w-[120px] h-[120px] sm:w-[160px] sm:h-[160px] rounded-2xl overflow-hidden mx-auto sm:mx-0">
            <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold" style={{ fontFamily: 'var(--font-montserrat)' }}>{doctor.name}</div>
            <div className="opacity-80 mt-1 text-sm sm:text-base">{doctor.specialty} · {doctor.experience} лет опыта</div>
            <p className="text-sm opacity-90 mt-3">{doctor.bio}</p>

            {doctor.interests?.length ? (
              <div className="mt-2 text-sm"><span className="font-semibold">Интересы:</span> {doctor.interests.join(', ')}</div>
            ) : null}
            {doctor.languages?.length ? (
              <div className="text-sm"><span className="font-semibold">Языки:</span> {doctor.languages.join(', ')}</div>
            ) : null}
            {doctor.education?.length ? (
              <div className="mt-3">
                <div className="font-semibold text-sm">Образование и сертификаты</div>
                <ul className="list-disc ml-5 text-sm opacity-90">
                  {doctor.education.map((e,i)=>(<li key={i}>{e}</li>))}
                </ul>
              </div>
            ) : null}
            {doctor.achievements?.length ? (
              <div className="mt-3">
                <div className="font-semibold text-sm">Достижения</div>
                <ul className="list-disc ml-5 text-sm opacity-90">
                  {doctor.achievements.map((e,i)=>(<li key={i}>{e}</li>))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {doctorServices.length > 0 && (
          <div className="mt-5 sm:mt-6">
            <div className="text-base sm:text-lg font-semibold mb-2">Услуги врача</div>
            <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white">
              {doctorServices.map(s => (
                <li key={s.slug} className="flex items-center justify-between gap-3 p-3">
                  <div className="min-w-0 flex items-center gap-2">
                    <span className="text-base">{s.icon ?? '🐾'}</span>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{s.name}</div>
                      <div className="text-xs opacity-70">
                        {(s.price ?? '').trim()}{s.duration ? ` · ${s.duration}` : ''}
                      </div>
                    </div>
                  </div>
                  <a className="text-teal text-sm whitespace-nowrap hover:underline" href={`/booking?doctorId=${doctor.id}&service=${s.slug}`}>
                    Записаться
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 sm:mt-6 grid grid-cols-2 gap-2 sm:gap-3">
          <button className="btn btn-primary" onClick={() => onBook(doctor.id)}>Записаться</button>
          <button className="btn btn-secondary" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}
