'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Slot = { date: string; time: string };
type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  bio: string;
  photo: string;
  vetmanagerId?: string;
  interests?: string[];
  languages?: string[];
  education?: string[];
};

export default function DoctorModal({
  doctor,
  onClose
}: { doctor: Doctor; onClose: ()=>void }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [picked, setPicked] = useState<Slot | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`/api/schedule?doctorId=${doctor.id}`);
        const data = await res.json();
        setSlots(data?.slots || []);
      } catch (e: any) {
        setError('Не удалось загрузить график врача.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [doctor.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-soft max-w-2xl w-full mx-4 p-6">
        <button className="absolute top-3 right-3 p-2" onClick={onClose} aria-label="Закрыть">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
        <div className="flex gap-4">
          <Image src={doctor.photo} alt={doctor.name} width={80} height={80} className="rounded-xl" />
          <div className="flex-1">
            <div className="text-xl font-semibold">{doctor.name}</div>
            <div className="text-sm opacity-80">{doctor.specialty} · {doctor.experience} лет опыта</div>
            <p className="text-sm opacity-90 mt-2">{doctor.bio}</p>
            {(doctor.interests?.length || doctor.languages?.length || doctor.education?.length) && (
              <div className="mt-3 text-sm">
                {doctor.interests?.length ? <div><span className="font-semibold">Интересы:</span> {doctor.interests.join(', ')}</div> : null}
                {doctor.languages?.length ? <div><span className="font-semibold">Языки:</span> {doctor.languages.join(', ')}</div> : null}
                {doctor.education?.length ? (
                  <div className="mt-1">
                    <div className="font-semibold">Образование/сертификаты:</div>
                    <ul className="list-disc ml-5 opacity-80">
                      {doctor.education.map((e,i)=>(<li key={i}>{e}</li>))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="text-lg font-semibold mb-2">Ближайшие слоты</div>
          {loading ? <div className="opacity-80 text-sm">Загрузка графика…</div> : null}
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {!loading && !error && (
            slots.length ? (
              <div className="grid sm:grid-cols-2 gap-2">
                {slots.map((s, idx) => {
                  const isSel = picked?.date === s.date && picked?.time === s.time;
                  return (
                    <button
                      key={idx}
                      onClick={()=>setPicked(s)}
                      className={`border rounded-xl px-4 py-3 text-sm text-left ${isSel ? 'bg-teal text-white border-teal' : 'hover:bg-cloud border-gray-200 bg-white'}`}
                    >
                      <div className="font-semibold">{new Date(s.date).toLocaleDateString('ru-RU', {weekday:'short', day:'2-digit', month:'short'})}</div>
                      <div className="opacity-80">{s.time}</div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="opacity-80 text-sm">Нет свободных слотов на ближайшую неделю. Попробуйте выбрать другого врача или зайдите позже.</div>
            )
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href={picked ? `/booking?doctorId=${doctor.id}&date=${picked.date}&time=${picked.time}` : `/booking?doctorId=${doctor.id}`}
            className="btn btn-primary"
          >
            {picked ? 'Записаться на выбранное время' : 'Записаться к врачу'}
          </Link>
          <button className="btn btn-secondary" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}
