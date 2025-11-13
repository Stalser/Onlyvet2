// app/doctor/appointment/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { appointments, patients } from '../../../../lib/doctor';
import { useMemo, useState } from 'react';
import AppointmentActions from '../../../../components/doctor/AppointmentActions';

function fmt(dt: string) {
  return new Date(dt).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' });
}

export default function AppointmentDetail() {
  const { id } = useParams<{ id: string }>();

  // Находим приём по id
  const a = useMemo(
    () => appointments.find((x) => x.id === id),
    [id]
  );

  // Находим пациента по patientId из приёма
  const p = useMemo(
    () => (a ? patients.find((pt) => pt.id === a.patientId) : undefined),
    [a]
  );

  if (!a || !p) {
    return <section className="container py-12">Запись не найдена</section>;
  }

  const [note, setNote] = useState('');

  return (
    <section className="container py-12">
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-xl">Запись #{a.id}</div>
            </div>
            <div className="mt-2 text-gray-600">
              <div>Пациент: {p.name}</div>
              <div>
                Дата: {fmt(a.startsAt)} — {fmt(a.endsAt)}
              </div>
              <div>Комментарий: {a.comment || '—'}</div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4 space-y-2">
            <div className="font-medium">Заметка</div>
            <textarea
              className="w-full border rounded-xl p-3 text-sm"
              placeholder="Введите заметку"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="flex justify-end">
              <button className="px-4 py-2 rounded-xl bg-black text-white text-sm">
                Сохранить
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-medium text-lg mb-3">Действия</div>
            <AppointmentActions appointmentId={a.id} />
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="font-medium text-lg mb-3">Информация о пациенте</div>
            <div className="text-gray-700 text-sm">
              <div>Имя: {p.name}</div>
              <div>Вид: {p.species}</div>
              <div>Возраст: {p.age}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
