// components/BookingWidget.tsx
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { doctors } from '@/lib/data';
import { servicesPricing } from '@/lib/pricing';

export default function BookingWidget(){
  const searchParams = useSearchParams();
  const initialDoctorEmail = searchParams.get('doctorEmail') || '';
  const initialServiceCode = searchParams.get('serviceCode') || '';

  const [doctorEmail, setDoctorEmail] = useState(initialDoctorEmail);
  const [serviceCode, setServiceCode] = useState(initialServiceCode);
  const [petName, setPetName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const selectedDoctor = useMemo(
    () => doctors.find(d => d.email === doctorEmail),
    [doctorEmail]
  );
  const selectedService = useMemo(
    () => servicesPricing.find(s => s.code === serviceCode),
    [serviceCode]
  );

  const submit = async () => {
    setSending(true);
    setResult(null);
    try{
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorEmail: doctorEmail || null,
          serviceCode: serviceCode || null,
          petName,
          contact,
          comment,
        }),
      });
      if(res.ok){
        setResult('Заявка отправлена. Администратор свяжется с вами для подтверждения.');
        setPetName('');
        setContact('');
        setComment('');
      }else{
        const data = await res.json().catch(()=>({}));
        setResult(data?.error || 'Не удалось отправить заявку. Попробуйте позже.');
      }
    }catch(e){
      setResult('Ошибка сети. Попробуйте позже.');
    }finally{
      setSending(false);
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-3" style={{color:'var(--navy)'}}>
        Записаться на онлайн-консультацию
      </h2>

      <div className="space-y-3 text-sm">
        <div>
          <label className="block mb-1">Врач</label>
          <select
            className="input w-full"
            value={doctorEmail}
            onChange={e=>setDoctorEmail(e.target.value)}
          >
            <option value="">Любой подходящий</option>
            {doctors.map(d=>(
              <option key={d.id} value={d.email}>
                {d.name} · {d.specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Услуга</label>
          <select
            className="input w-full"
            value={serviceCode}
            onChange={e=>setServiceCode(e.target.value)}
          >
            <option value="">Выберите услугу</option>
            {servicesPricing.map(s=>(
              <option key={s.code} value={s.code}>
                {s.name} {s.priceRUB !== undefined ? `— ${s.priceRUB.toLocaleString('ru-RU')} ₽` : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Имя питомца</label>
          <input
            className="input w-full"
            value={petName}
            onChange={e=>setPetName(e.target.value)}
            placeholder="Например, Симба"
          />
        </div>

        <div>
          <label className="block mb-1">Контакт для связи</label>
          <input
            className="input w-full"
            value={contact}
            onChange={e=>setContact(e.target.value)}
            placeholder="+7 ___ ___‑__‑__ или @username"
          />
        </div>

        <div>
          <label className="block mb-1">Кратко опишите проблему</label>
          <textarea
            className="input w-full min-h-[100px]"
            value={comment}
            onChange={e=>setComment(e.target.value)}
            placeholder="Когда появились симптомы, что уже делали, есть ли анализы..."
          />
        </div>

        {selectedDoctor || selectedService ? (
          <div className="rounded-xl bg-[var(--cloud)]/60 p-3 text-xs opacity-80">
            {selectedDoctor && (
              <div>
                <span className="font-semibold">Выбран врач: </span>
                {selectedDoctor.name} · {selectedDoctor.specialty}
              </div>
            )}
            {selectedService && (
              <div>
                <span className="font-semibold">Услуга: </span>
                {selectedService.name}
                {selectedService.priceRUB !== undefined &&
                  ` — ${selectedService.priceRUB.toLocaleString('ru-RU')} ₽`}
              </div>
            )}
          </div>
        ) : null}

        <div className="pt-2 flex justify-end">
          <button
            className="btn btn-primary rounded-xl px-4"
            onClick={submit}
            disabled={sending || !contact || !comment}
          >
            {sending ? 'Отправляем...' : 'Отправить заявку'}
          </button>
        </div>

        {result && (
          <div className="text-xs opacity-80 mt-2">
            {result}
          </div>
        )}
      </div>
    </section>
  );
}
