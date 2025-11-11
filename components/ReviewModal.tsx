'use client';
import { useState } from 'react';
import Stars from '@/components/Stars';

export default function ReviewModal({ onClose }:{ onClose: ()=>void }) {
  const [name, setName] = useState('');
  const [pet, setPet] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [consent, setConsent] = useState(false);
  const [photo, setPhoto] = useState<string>('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result || ''));
    reader.readAsDataURL(file);
  }

  async function submit() {
    if (!name || !text || !consent) return alert('Заполните имя, отзыв и дайте согласие.');
    setLoading(true);
    try {
      const payload = { name, pet, rating, text, photo, createdAt: new Date().toISOString() };
      const local = JSON.parse(localStorage.getItem('onlyvet:reviews') || '[]');
      localStorage.setItem('onlyvet:reviews', JSON.stringify([payload, ...local].slice(0, 50)));
      await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        <div className="relative bg-white rounded-2xl shadow-soft max-w-md w-full mx-4 p-6 text-center">
          <div className="text-xl font-semibold mb-2">Спасибо за отзыв!</div>
          <p className="opacity-80 text-sm">Мы проверим его и опубликуем в ближайшее время.</p>
          <button className="btn btn-primary mt-4" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-soft max-w-lg w-full mx-4 p-6">
        <button className="absolute top-3 right-3 p-2" onClick={onClose} aria-label="Закрыть">
          <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
        <div className="text-xl font-semibold mb-4" style={{fontFamily:'var(--font-mонтserrat)'}}>Оставить отзыв</div>
        <div className="grid gap-4">
          <div>
            <label className="label">Ваше имя</label>
            <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Например, Екатерина" />
          </div>
          <div>
            <label className="label">Питомец (необязательно)</label>
            <input className="input" value={pet} onChange={e=>setPet(e.target.value)} placeholder="Кот Мурзик" />
          </div>
          <div>
            <label className="label">Оценка</label>
            <div className="flex items-center gap-2">
              <Stars value={rating} />
              <select className="select" value={rating} onChange={e=>setRating(Number(e.target.value))}>
                {[5,4,3,2,1].map(n=><option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Отзыв</label>
            <textarea className="textarea h-32" value={text} onChange={e=>setText(e.target.value)} placeholder="Как прошла консультация? Что было полезно? Что улучшить?" />
          </div>
          <div>
            <label className="label">Фото питомца (необязательно)</label>
            <input type="file" accept="image/*" onChange={onPick} />
            {photo && <img src={photo} alt="Фото питомца" className="rounded-xl mt-2 max-h-40 object-contain" />}
          </div>
          <label className="inline-flex items-center gap-2 text-xs opacity-80">
            <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} />
            <span>Согласен(а) с <a href="/privacy" className="text-teal underline">политикой обработки данных</a>.</span>
          </label>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Отправка…' : 'Отправить'}</button>
            <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
          </div>
        </div>
      </div>
    </div>
  );
}
