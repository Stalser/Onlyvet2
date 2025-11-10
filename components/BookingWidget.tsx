'use client';
import { useEffect, useMemo, useState } from 'react';
import { doctors, specialties } from '@/lib/data';
import { createTimeSlots } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

type BookingPayload = {
  ownerName: string; email: string; phone: string;
  petName: string; petType: string;
  specialty: string; doctorId: string; date: string; time: string; notes?: string;
  meds?: string;
  attachments?: { name: string; size: number; type: string }[];
}

export default function BookingWidget() {
  const params = useSearchParams();
  const presetDoctorId = params.get('doctorId') || '';
  const [specialty, setSpecialty] = useState<string>('');
  const [doctorId, setDoctorId] = useState<string>(presetDoctorId);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [petType, setPetType] = useState<string>('Кошка');
  const [ownerName, setOwnerName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [petName, setPetName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [meds, setMeds] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const filteredDoctors = useMemo(() => doctors.filter(d => !specialty || d.specialty === specialty), [specialty]);

  useEffect(() => {
    if (presetDoctorId) {
      const doc = doctors.find(d => d.id === presetDoctorId);
      if (doc) setSpecialty(doc.specialty);
    }
  }, [presetDoctorId]);

  const days = Array.from({ length: 14 }, (_, i) => {
    const dt = new Date(); dt.setDate(dt.getDate() + i); dt.setHours(0,0,0,0); return dt;
  });
  const slots = createTimeSlots(10, 20, 60);

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const picked = Array.from(e.dataTransfer.files).slice(0, 10);
    setFiles(prev => [...prev, ...picked].slice(0, 10));
  }
  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files ? Array.from(e.target.files).slice(0, 10) : [];
    setFiles(prev => [...prev, ...picked].slice(0, 10));
  }

  async function submit() {
    setError(''); setLoading(true);
    const attachments = files.map(f => ({ name: f.name, size: f.size, type: f.type }));
    const payload: BookingPayload = { ownerName, email, phone, petName, petType, specialty, doctorId, date, time, notes, meds, attachments };
    const res = await fetch('/api/booking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    setLoading(false);
    if (res.ok) {
      localStorage.setItem('onlyvet:lastBooking', JSON.stringify(payload));
      window.location.href = '/checkout';
    } else {
      const data = await res.json().catch(()=>({}));
      setError(data?.error || 'Не удалось оформить запись.');
    }
  }

  const disabled = !ownerName || !email || !phone || !petName || !specialty || !doctorId || !date || !time;

  return (
    <div className="card">
      <h1 className="text-2xl font-bold mb-4" style={{fontFamily:'var(--font-montserrat)'}}>Запись на консультацию</h1>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="label">Специальность</label>
          <select className="select" value={specialty} onChange={(e)=>setSpecialty(e.target.value)}>
            <option value="">Выберите…</option>
            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Врач</label>
          <select className="select" value={doctorId} onChange={(e)=>setDoctorId(e.target.value)}>
            <option value="">Выберите…</option>
            {filteredDoctors.map(d => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Вид питомца</label>
          <select className="select" value={petType} onChange={(e)=>setPetType(e.target.value)}>
            {['Кошка','Собака','Грызун','Птица','Рептилия','Другое'].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Имя питомца</label>
          <input className="input" value={petName} onChange={(e)=>setPetName(e.target.value)} placeholder="Мурзик"/>
        </div>

        <div className="md:col-span-2">
          <label className="label">Дата</label>
          <div className="grid grid-cols-7 gap-2">
            {days.map((d) => {
              const val = d.toISOString().slice(0,10);
              const isSel = date === val;
              return (
                <button key={val} type="button" onClick={()=>setDate(val)} className={`p-3 rounded-xl border text-sm ${isSel ? 'bg-teal text-white border-teal' : 'bg-white hover:bg-cloud border-gray-200'}`}>
                  <div className="font-semibold">{d.toLocaleDateString('ru-RU',{weekday:'short'})}</div>
                  <div>{d.getDate()} {d.toLocaleDateString('ru-RU',{month:'short'})}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="label">Время</label>
          <div className="flex flex-wrap gap-2">
            {slots.map(s => {
              const isSel = time === s;
              return (
                <button key={s} type="button" onClick={()=>setTime(s)} className={`px-4 py-2 rounded-xl border text-sm ${isSel ? 'bg-coral text-white border-coral' : 'bg-white hover:bg-cloud border-gray-200'}`}>{s}</button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="label">Ваше имя</label>
          <input className="input" value={ownerName} onChange={(e)=>setOwnerName(e.target.value)} placeholder="Иван"/>
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="name@example.com"/>
        </div>
        <div>
          <label className="label">Телефон</label>
          <input className="input" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="+7 900 000-00-00"/>
        </div>

        <div className="md:col-span-2">
          <label className="label">Препараты и дозы (если даёте сейчас)</label>
          <textarea className="textarea h-24" value={meds} onChange={(e)=>setMeds(e.target.value)} placeholder="Название — доза — кратность — когда давали последний раз"/>
        </div>

        <div className="md:col-span-2">
          <label className="label">Фото/видео/документы (до 10 файлов)</label>
          <div
            onDrop={onDrop}
            onDragOver={(e)=>e.preventDefault()}
            className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:bg-cloud cursor-pointer"
            onClick={()=>document.getElementById('filepick')?.click()}
          >
            Перетащите файлы сюда или нажмите, чтобы выбрать
            <input id="filepick" type="file" multiple onChange={onPick} className="hidden"/>
            {files.length>0 && (
              <ul className="mt-3 text-xs opacity-80 text-left">
                {files.map((f,i)=>(<li key={i}>• {f.name} ({Math.round(f.size/1024)} КБ)</li>))}
              </ul>
            )}
          </div>
          <p className="text-xs opacity-60 mt-2">Пока мы сохраняем только список файлов как метаданные. Загрузку в облако подключим позже.</p>
        </div>

        <div className="md:col-span-2">
          <label className="label">Кратко опишите запрос</label>
          <textarea className="textarea h-24" value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Симптомы, когда начались, поведение, аппетит, вода, стул…"/>
        </div>

        {error && <div className="md:col-span-2 text-red-600 text-sm">{error}</div>}

        <div className="md:col-span-2 flex items-center gap-3">
          <button disabled={disabled || loading} onClick={submit} className="btn btn-primary">{loading ? 'Бронирование…' : 'Подтвердить и перейти к оплате'}</button>
        </div>
      </div>
      <p className="text-xs opacity-70 mt-4">Нажимая кнопку, вы соглашаетесь с условиями сервиса и обработкой персональных данных.</p>
    </div>
  );
}
