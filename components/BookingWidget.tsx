// components/BookingWidget.tsx
'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { doctors } from '@/lib/data';
import { servicesPricing, doctorServicesMap } from '@/lib/pricing';
import { doctorSlots } from '@/lib/doctorSchedule';

export default function BookingWidget(){
  const searchParams = useSearchParams();
  const initialDoctorEmail = searchParams.get('doctorEmail') || '';
  const initialServiceCode = searchParams.get('serviceCode') || '';

  const [doctorEmail, setDoctorEmail] = useState(initialDoctorEmail);
  const [serviceCode, setServiceCode] = useState(initialServiceCode);
  const [slotId, setSlotId] = useState<string>('');
  const [petName, setPetName] = useState('');
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const selectedService = useMemo(
    () => servicesPricing.find(s => s.code === serviceCode),
    [serviceCode]
  );

  const filteredDoctors = useMemo(() => {
    if (!serviceCode) return doctors;
    return doctors.filter(d => {
      const codes = doctorServicesMap[d.email] || [];
      return codes.includes(serviceCode);
    });
  }, [serviceCode]);

  const safeDoctorEmail = useMemo(() => {
    if (!doctorEmail) return '';
    const ok = filteredDoctors.some(d => d.email === doctorEmail);
    return ok ? doctorEmail : '';
  }, [doctorEmail, filteredDoctors]);

  const selectedDoctor = useMemo(
    () => filteredDoctors.find(d => d.email === safeDoctorEmail),
    [filteredDoctors, safeDoctorEmail]
  );

  const availableSlots = useMemo(() => {
    if (!safeDoctorEmail) return [];
    return doctorSlots
      .filter(s => s.doctorEmail === safeDoctorEmail)
      .sort((a,b)=> new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  }, [safeDoctorEmail]);

  const submit = async () => {
    setSending(true);
    setResult(null);
    try{
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorEmail: safeDoctorEmail || null,
          serviceCode: serviceCode || null,
          slotId: slotId || null,
          petName,
          contact,
          comment,
        }),
      });
      if(res.ok){
        setResult('Заявка отправлена. Администратор свяжется с вами для подтверждения времени консультации.');
        setPetName('');
        setContact('');
        setComment('');
        setSlotId('');
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
          <label className="block mb-1">Услуга</label>
          <select
            className="input w-full"
            value={serviceCode}
            onChange={e=>{ setServiceCode(e.target.value); setSlotId(''); }}
          >
            <option value="">Выберите услугу</option>
            {servicesPricing.map(s=>(
              <option key={s.code} value={s.code}>
                {s.name}{' '}
                {s.priceRUB !== undefined ? `— ${s.priceRUB.toLocaleString('ru-RU')} ₽` : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Врач</label>
          <select
            className="input w-full"
            value={safeDoctorEmail}
            onChange={e=>{ setDoctorEmail(e.target.value); setSlotId(''); }}
            disabled={!serviceCode}
          >
            <option value="">
              {serviceCode
                ? 'Любой врач, оказывающий эту услугу'
                : 'Сначала выберите услугу'}
            </option>
            {filteredDoctors.map(d=>(
              <option key={d.id} value={d.email}>
                {d.name} · {d.specialty}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Время консультации</label>
          {safeDoctorEmail ? (
            availableSlots.length > 0 ? (
              <select
                className="input w-full"
                value={slotId}
                onChange={e=>setSlotId(e.target.value)}
              >
                <option value="">Выберите удобное время</option>
                {availableSlots.map(slot => (
                  <option key={slot.id} value={slot.id}>
                    {new Date(slot.startsAt).toLocaleString('ru-RU', {
                      weekday: 'short',
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-xs opacity-70">
                Для выбранного врача нет заранее заданных онлайн-слотов. Администратор подберёт время вручную.
              </div>
            )
          ) : (
            <div className="text-xs opacity-70">
              Сначала выберите услугу и врача — после этого появится список доступных слотов, если они заданы.
            </div>
          )}
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
            placeholder="+7 ___ ___-__-__ или @username"
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

        {(selectedService || selectedDoctor || slotId) && (
          <div className="rounded-xl bg-[var(--cloud)]/60 p-3 text-xs opacity-80">
            {selectedService && (
              <div>
                <span className="font-semibold">Услуга: </span>
                {selectedService.name}{' '}
                {selectedService.priceRUB !== undefined &&
                  `— ${selectedService.priceRUB.toLocaleString('ru-RU')} ₽`}
              </div>
            )}
            {selectedDoctor && (
              <div>
                <span className="font-semibold">Врач: </span>
                {selectedDoctor.name} · {selectedDoctor.specialty}
              </div>
            )}
            {slotId && (
              <div>
                <span className="font-semibold">Время: </span>
                {availableSlots.find(s=>s.id===slotId) &&
                  new Date(
                    availableSlots.find(s=>s.id===slotId)!.startsAt
                  ).toLocaleString('ru-RU', {
                    weekday: 'short',
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }
              </div>
            )}
          </div>
        )}

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
