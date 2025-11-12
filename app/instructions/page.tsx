// app/instructions/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

type Section = {
  id: string;
  title: string;
  icon: string;
  body: (JSX.Element | string)[];
};

const sections: Section[] = [
  {
    id: 'contact',
    title: 'Как с нами связаться',
    icon: '/instructions/contact.svg',
    body: [
      <p key="1">Самый быстрый путь — нажать <Link href="/booking" className="text-[var(--teal)] underline">«Записаться»</Link> и указать контакт.</p>,
      <p key="2">Ещё можно написать в Telegram/VK через шапку сайта. Отвечаем оперативно в рабочее время.</p>,
      <p key="3"><b>Важно:</b> при угрозе жизни — <u>срочно</u> в ближайшую клинику, онлайн не подходит.</p>
    ]
  },
  {
    id: 'register',
    title: 'Регистрация и вход',
    icon: '/instructions/register.svg',
    body: [
      <ol key="olr" className="list-decimal pl-5 space-y-1">
        <li>Откройте <Link href="/auth/login" className="text-[var(--teal)] underline">«Войти»</Link> и введите e‑mail.</li>
        <li>Подтвердите кодом из письма — пароль не нужен.</li>
        <li>В «Личном кабинете» добавьте питомца: порода, вес, возраст.</li>
      </ol>
    ]
  },
  {
    id: 'payment',
    title: 'Оплата и возврат',
    icon: '/instructions/payment.svg',
    body: [
      <p key="p1">Стоимость видно при выборе услуги и врача. Оплата картой/СБП, чек приходит на e‑mail.</p>,
      <p key="p2">Перенос/возврат: за 24 часа до времени — без комиссии; позднее — по правилам клиники (см. договор оферты).</p>
    ]
  },
  {
    id: 'booking',
    title: 'Как записаться',
    icon: '/instructions/booking.svg',
    body: [
      <ol key="olb" className="list-decimal pl-5 space-y-1">
        <li>Нажмите <Link href="/booking" className="text-[var(--teal)] underline">«Записаться»</Link>.</li>
        <li>Выберите формат: чат или видео.</li>
        <li>Загрузите фото/видео/анализы — так консультация пройдёт быстрее и точнее.</li>
        <li>Подтвердите оплату — запись появится в «Личном кабинете», придёт напоминание.</li>
      </ol>
    ]
  },
  {
    id: 'video',
    title: 'FAQ по видеосвязи',
    icon: '/instructions/video.svg',
    body: [
      <ul key="ulv" className="list-disc pl-5 space-y-1">
        <li>Ссылка на видеозвонок — в «Личном кабинете» в карточке записи.</li>
        <li>Поддерживаем Chrome / Safari / Edge последних версий.</li>
        <li>Разрешите доступ к камере/микрофону, подключите наушники — звук будет лучше.</li>
        <li>Если нет видео/звука — перезайдите по ссылке, проверьте, что камера/микрофон не заняты другим приложением.</li>
      </ul>
    ]
  },
  {
    id: 'prepare',
    title: 'Подготовка к онлайн‑приёму',
    icon: '/instructions/prepare.svg',
    body: [
      <ul key="ulp" className="list-disc pl-5 space-y-1">
        <li>Фото проблемы и общий вид питомца при дневном свете.</li>
        <li>Температура, вес, частота дыхания в покое (если можно).</li>
        <li>Список лекарств/доз, если что‑то уже принимали.</li>
        <li>Тихое место, стабильный интернет, заряд устройства.</li>
      </ul>
    ]
  },
  {
    id: 'flags',
    title: 'Красные флаги (когда онлайн недостаточно)',
    icon: '/instructions/flags.svg',
    body: [
      <ul key="ulf" className="list-disc pl-5 space-y-1">
        <li>Острая вялость, потеря сознания, судороги.</li>
        <li>Травма, кровотечение, падение с высоты.</li>
        <li>Затруднённое дыхание, синюшность слизистых.</li>
        <li>Многократная рвота с вялостью, неукротимая диарея.</li>
        <li>Отсутствие мочеиспускания &gt; 24 часов, болезненное нажатие на живот.</li>
      </ul>,
      <p key="pf" className="mt-2"><b>Действие:</b> срочно обращайтесь в ближайшую клинику.</p>
    ]
  },
  {
    id: 'after',
    title: 'Что будет после консультации',
    icon: '/instructions/after.svg',
    body: [
      <p key="pa1">Вы получите план лечения в PDF и в «Личном кабинете». Чат открыт 24–48 часов для уточнений.</p>,
      <p key="pa2">Если состояние ухудшается — следуйте «красным флагам» и обращайтесь очно.</p>
    ]
  }
];

function Item({ s, open, onToggle }:{ s:Section; open:boolean; onToggle:()=>void }){
  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
      <button onClick={onToggle} className="w-full text-left px-4 py-3 flex items-center justify-between gap-3">
        <span className="flex items-center gap-3">
          <Image src={s.icon} alt="" width={40} height={26} />
          <span className="font-semibold" style={{color:'var(--navy)'}}>{s.title}</span>
        </span>
        <span className="opacity-60">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="px-4 pb-4">
          {s.body.map((b,i)=>(<div key={i} className="mb-2">{b}</div>))}
        </div>
      )}
    </div>
  );
}

export default function InstructionsPage(){
  const [openId, setOpenId] = useState<string>('contact');

  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-6 flex items-end justify-between gap-3 flex-wrap">
        <h1 className="text-3xl font-bold" style={{color:'var(--navy)'}}>Инструкции и ответы</h1>
        <div className="flex gap-2">
          <Link href="/booking" className="btn btn-primary rounded-xl px-4">Записаться</Link>
          <Link href="/auth/login" className="btn bg-white border border-gray-300 rounded-xl px-4">Войти</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {sections.map(sec=>(
          <Item key={sec.id} s={sec} open={openId===sec.id} onToggle={()=>setOpenId(p=>p===sec.id? '' : sec.id)}/>
        ))}
      </div>

      <div className="mt-6 text-sm opacity-70">
        Нужна помощь прямо сейчас? Напишите нам в Telegram/VK — кнопки в шапке сайта.
      </div>
    </section>
  );
}