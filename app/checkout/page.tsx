// app/checkout/page.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Booking = {
  ownerName:string; email:string; phone:string;
  petName:string; petType:string;
  specialty:string; doctorId:string; date:string; time:string; notes?:string;
  serviceSlug?: string; serviceName?: string; servicePrice?: string; serviceDuration?: string;
};

export default function CheckoutPage(){
  const [booking,setBooking]=useState<Booking|null>(null);
  const [loading,setLoading]=useState(false);
  const [ok,setOk]=useState(false);

  useEffect(()=>{
    const raw=localStorage.getItem('onlyvet:lastBooking');
    if(raw) setBooking(JSON.parse(raw));
  },[]);

  async function pay(){
    if(!booking) return;
    setLoading(true);
    const res=await fetch('/api/payment',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({booking})});
    setLoading(false);
    if(res.ok){ setOk(true); setTimeout(()=>{window.location.href='/success';},1200); }
  }

  if(!booking) return (
    <section className="container py-16">
      <div className="card">
        <div className="text-lg font-semibold mb-2">Нет активной записи</div>
        <p className="opacity-80 mb-4">Сначала оформите консультацию.</p>
        <Link href="/booking" className="btn btn-primary">К записи</Link>
      </div>
    </section>
  );

  return (
    <section className="container py-16">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card lg:col-span-2">
          <h1 className="text-2xl font-bold mb-4" style={{fontFamily:'var(--font-montserrat)'}}>Оформление</h1>
          <div className="space-y-1 text-sm opacity-90">
            <div><b>Питомец:</b> {booking.petName} ({booking.petType})</div>
            <div><b>Специальность:</b> {booking.specialty}</div>
            <div><b>Дата и время:</b> {booking.date} {booking.time}</div>
            {booking.serviceName && (
              <div><b>Услуга:</b> {booking.serviceName} {booking.servicePrice ? `— ${booking.servicePrice}` : ''} {booking.serviceDuration ? `(${booking.serviceDuration})` : ''}</div>
            )}
            <div><b>Контакты:</b> {booking.ownerName}, {booking.phone}, {booking.email}</div>
          </div>
          {booking.notes && <p className="text-sm opacity-80 mt-3"><b>Заметки:</b> {booking.notes}</p>}
        </div>

        <div className="card">
          <div className="text-lg font-semibold mb-2">Оплата</div>
          <p className="text-sm opacity-80 mb-4">Оплата по карте. Чек и подтверждение отправим на email.</p>
          <button className="btn btn-primary w-full" onClick={pay} disabled={loading}>
            {loading ? 'Обработка…' : 'Оплатить'}
          </button>
          {ok && <div className="text-teal text-sm mt-2">Успешно! Перенаправляем…</div>}
        </div>
      </div>
    </section>
  );
}
