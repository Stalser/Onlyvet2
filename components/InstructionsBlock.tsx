// components/InstructionsBlock.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';

const items = [
  {
    id: 'contact',
    title: 'Как с нами связаться',
    img: '/instructions/contact.svg',
    bullets: [
      'Нажмите «Записаться» — укажите контакт и кратко опишите ситуацию.',
      'Или напишите нам в Telegram/VK (кнопки в шапке).',
      'Экстренно? При угрозе жизни — сразу в клинику.'
    ],
    cta: { label: 'Связаться', href: '/booking' }
  },
  {
    id: 'register',
    title: 'Регистрация/вход',
    img: '/instructions/register.svg',
    bullets: [
      'Откройте «Войти», введите e‑mail и код из письма.',
      'В кабинете добавьте питомца: порода, вес, возраст.'
    ],
    cta: { label: 'Войти', href: '/auth/login' }
  },
  {
    id: 'payment',
    title: 'Оплата',
    img: '/instructions/payment.svg',
    bullets: [
      'Стоимость видна при выборе услуги и врача.',
      'Оплата картой/СБП, чек — на e‑mail.',
      'Переносы/возвраты — по правилам клиники.'
    ],
    cta: { label: 'Оплатить при записи', href: '/booking' }
  },
  {
    id: 'booking',
    title: 'Запись на консультацию',
    img: '/instructions/booking.svg',
    bullets: [
      'Выберите формат: чат или видео.',
      'Загрузите фото/анализы — так быстрее и точнее.',
      'За 5–10 минут до старта придёт напоминание.'
    ],
    cta: { label: 'Записаться', href: '/booking' }
  },
  {
    id: 'prepare',
    title: 'Подготовка к онлайн‑приёму',
    img: '/instructions/prepare.svg',
    bullets: [
      'Фото области проблемы + общего вида при свете.',
      'Замерьте температуру, вес, ЧДД (если можно).',
      'Подготовьте список лекарств/доз.'
    ],
    cta: { label: 'Чек‑лист', href: '/instructions#prepare' }
  },
  {
    id: 'after',
    title: 'После консультации',
    img: '/instructions/after.svg',
    bullets: [
      'Вы получите план в PDF и в кабинете.',
      'Чат открыт 24–48 часов для уточнений.',
      'При ухудшении — действуйте по «красным флагам».'
    ],
    cta: { label: 'Личный кабинет', href: '/account' }
  }
];

export default function InstructionsBlock(){
  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-3 flex-wrap">
        <h2 className="text-3xl font-bold" style={{color:'var(--navy)'}}>Инструкции</h2>
        <Link href="/instructions" className="btn bg-white border border-gray-300 rounded-xl px-4">Все инструкции</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {items.map(it => (
          <article key={it.id} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3 mb-3">
              <Image src={it.img} alt="" width={80} height={54} className="rounded-lg" />
              <h3 className="font-semibold text-lg" style={{color:'var(--navy)'}}>{it.title}</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              {it.bullets.map((b,i)=>(<li key={i} className="opacity-90">{b}</li>))}
            </ul>
            <div className="flex justify-end">
              <Link href={it.cta.href} className="btn btn-primary rounded-xl px-4">{it.cta.label}</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
