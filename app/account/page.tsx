'use client';
import { useEffect, useState } from 'react';

type Booking = {
  ownerName: string; email: string; phone: string;
  petName: string; petType: string;
  specialty: string; doctorId: string; date: string; time: string; notes?: string;
};

export default function AccountPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem('onlyvet:lastBooking');
    const arr = raw ? [JSON.parse(raw)] : [];
    setBookings(arr);
  }, []);

  function printSummary(b: Booking) {
    const w = window.open('', '_blank');
    if (!w) return;
    w.document.write(`
      <html><head><title>Выписка OnlyVet</title>
      <style>
        body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Helvetica,Arial,sans-serif;padding:40px;color:#1E2B3C}
        h1{font-size:22px;margin:0 0 10px}
        .box{border:1px solid #e5e7eb;border-radius:16px;padding:16px;margin:12px 0;background:#fff}
        small{color:#6b7280}
      </style></head><body>
      <h1>Выписка консультации</h1>
      <div class="box">
        <div><b>Питомец:</b> ${b.petName} (${b.petType})</div>
        <div><b>Специальность:</b> ${b.specialty}</div>
        <div><b>Дата и время:</b> ${b.date} ${b.time}</div>
        <div><b>Владелец:</b> ${b.ownerName} — ${b.phone} — ${b.email}</div>
        ${b.notes ? `<div><b>Заметки:</b> ${b.notes}</div>` : ''}
      </div>
      <p><small>OnlyVet — мы рядом, даже когда врач далеко.</small></p>
      </body></html>
    `);
    w.document.close(); w.focus(); w.print();
  }

  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-6" style={{fontFamily:'var(--font-montserrat)'}}>Личный кабинет</h1>
      {bookings.length === 0 ? (
        <div className="card">У вас пока нет записей.</div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b, i) => (
            <div key={i} className="card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="text-sm opacity-90">
                <div><b>{b.petName}</b> — {b.specialty}</div>
                <div>{b.date} {b.time}</div>
              </div>
              <div className="flex gap-3">
                <button className="btn btn-secondary" onClick={() => printSummary(b)}>Печать/PDF</button>
                <a className="btn btn-primary" href="/booking">Повторить запись</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
