// components/doctor/PatientCard.tsx
'use client';
import { Patient } from '@/lib/doctor';

export default function PatientCard({ p }:{ p: Patient }){
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <h3 className="font-semibold mb-3" style={{color:'var(--navy)'}}>Пациент: {p.name}</h3>
      <div className="grid sm:grid-cols-2 gap-2 text-sm">
        <div><span className="opacity-60">Вид: </span>{p.species}</div>
        {p.breed && <div><span className="opacity-60">Порода: </span>{p.breed}</div>}
        {p.age && <div><span className="opacity-60">Возраст: </span>{p.age}</div>}
        {p.weightKg && <div><span className="opacity-60">Вес: </span>{p.weightKg} кг</div>}
      </div>
      {p.owner && (
        <div className="mt-3 text-sm">
          <div className="opacity-60">Владелец</div>
          <div>{p.owner.name}</div>
          <div className="opacity-80">{p.owner.phone} {p.owner.email && ' · '}{p.owner.email}</div>
        </div>
      )}
      {p.notes && <div className="mt-3 text-sm opacity-80">{p.notes}</div>}
    </div>
  );
}
