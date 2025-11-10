'use client';
import Image from 'next/image';

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
  achievements?: string[];
  publications?: string[];
};

export default function DoctorDetailsModal({ doctor, onClose, onBook }:{ doctor: Doctor; onClose: ()=>void; onBook: (doctorId:string)=>void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-soft max-w-3xl w-full mx-4 p-6 overflow-y-auto max-h-[90vh]">
        <button className="absolute top-3 right-3 p-2" onClick={onClose} aria-label="Закрыть">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
        <div className="grid md:grid-cols-[160px_1fr] gap-6 items-start">
          <div className="relative w-[160px] h-[160px] rounded-2xl overflow-hidden">
            <Image src={doctor.photo} alt={doctor.name} fill className="object-cover" />
          </div>
          <div>
            <div className="text-2xl font-bold" style={{fontFamily:'var(--font-montserrat)'}}>{doctor.name}</div>
            <div className="opacity-80 mt-1">{doctor.specialty} · {doctor.experience} лет опыта</div>
            <p className="text-sm opacity-90 mt-3">{doctor.bio}</p>
            {doctor.interests?.length ? <div className="mt-3 text-sm"><span className="font-semibold">Клинические интересы:</span> {doctor.interests.join(', ')}</div> : null}
            {doctor.languages?.length ? <div className="text-sm"><span className="font-semibold">Языки:</span> {doctor.languages.join(', ')}</div> : null}
            {doctor.education?.length ? (<div className="mt-4"><div className="font-semibold text-sm">Образование и сертификаты</div><ul className="list-disc ml-5 text-sm opacity-90">{doctor.education.map((e,i)=>(<li key={i}>{e}</li>))}</ul></div>) : null}
            {doctor.achievements?.length ? (<div className="mt-4"><div className="font-semibold text-sm">Достижения</div><ul className="list-disc ml-5 text-sm opacity-90">{doctor.achievements.map((e,i)=>(<li key={i}>{e}</li>))}</ul></div>) : null}
            {doctor.publications?.length ? (<div className="mt-4"><div className="font-semibold text-sm">Публикации</div><ul className="list-disc ml-5 text-sm opacity-90">{doctor.publications.map((e,i)=>(<li key={i}>{e}</li>))}</ul></div>) : null}
            <div className="mt-6 flex gap-3">
              <button className="btn btn-primary" onClick={()=>onBook(doctor.id)}>Записаться</button>
              <button className="btn btn-secondary" onClick={onClose}>Закрыть</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
