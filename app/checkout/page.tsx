'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type Booking = {
  ownerName: string; email: string; phone: string;
  petName: string; petType: string;
  specialty: string; doctorId: string; date: string; time: string; notes?: string;
};

export default function CheckoutPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('onlyvet:lastBooking');
    if (raw) setBooking(JSON.parse(raw));
  }, []);

  async function pay() {
    if (!booking) return;
    setLoading(true);
    const res = await fetch('/api/payment', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ booking }) });
    setLoading(false);
    if (res.ok) { setOk(true); setTimeout(() => { window.location.href = '/success'; }, 1200); }
  }

  if (!booking) return (
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
            <div><b>Контакты:</b> {booking.ownerName}, {booking.phone}, {booking.email}</div>
            {booking.notes && <div><b>Комментарий:</b> {booking.notes}</div>}
          </div>
        </div>
        <div className="card">
          <div className="text-lg font-semibold mb-2">Итог</div>
          <div className="flex items-center justify-between">
            <span>Онлайн-консультация</span><span className="font-semibold">1 500 ₽</span>
          </div>
          <button onClick={pay} disabled={loading || ok} className="btn btn-primary w-full mt-4">{loading ? 'Оплата…' : (ok ? 'Оплачено' : 'Оплатить' )}</button>
          <p className="text-xs opacity-70 mt-3">Оплата картой. Квитанция придёт на email.</p>
        </div>
      </div>
    </section>
  );
}
