'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

type Section = { id: string; title: string; icon: string; body: (JSX.Element|string)[] };

const sections: Section[] = [
  { id:'contact', title:'Как с нами связаться', icon:'/instructions/contact.svg', body:[
    <p key="1">Самый быстрый путь — нажать <Link href="/booking" className="text-[var(--teal)] underline">«Записаться»</Link> и указать контакт.</p>,
    <p key="2">Также доступны Telegram/VK из шапки сайта. Мы отвечаем оперативно в рабочее время.</p>,
    <p key="3"><b>Важно:</b> при угрозе жизни — <u>срочно</u> в клинику, онлайн не подходит.</p>
  ]},
  { id:'register', title:'Регистрация и вход', icon:'/instructions/register.svg', body:[
    <ol key="olr" className="list-decimal pl-5 space-y-1">
      <li>Откройте <Link href="/auth/login" className="text-[var(--teal)] underline">«Войти»</Link>.</li>
      <li>Введите e‑mail → подтвердите кодом из письма (пароль не нужен).</li>
      <li>В «Личном кабинете» добавьте питомца: порода, вес, возраст.</li>
    </ol>
  ]},
  { id:'payment', title:'Оплата и возврат', icon:'/instructions/payment.svg', body:[
    <p key="p1">Стоимость видно при выборе услуги и врача. Оплата картой/СБП, чек приходит на e‑mail.</p>,
    <p key="p2">Перенос/возврат: за 24 часа — без комиссии; позднее — по правилам клиники (см. договор оферты).</p>
  ]},
  { id:'booking', title:'Как записаться', icon:'/instructions/booking.svg', body:[
    <ol key="olb" className="list-decimal pl-5 space-y-1">
      <li>Нажмите <Link href="/booking" className="text-[var(--teal)] underline">«Записаться»</Link>.</li>
      <li>Выберите формат: чат или видео.</li>
      <li>Загрузите фото/видео/анализы — так консультация пройдёт быстрее и точнее.</li>
      <li>Подтвердите оплату — запись появится в «Личном кабинете», придёт напоминание.</li>
    </ol>
  ]},
  { id:'prepare', title:'Подготовка к онлайн‑приёму', icon:'/instructions/prepare.svg', body:[
    <ul key="ulp" className="list-disc pl-5 space-y-1">
      <li>Фото проблемы и общий вид питомца при свете.</li>
      <li>Температура, вес, ЧДД (если возможно).</li>
      <li>Список лекарств/доз, если что‑то уже принимали.</li>
      <li>Тихое место, стабильный интернет, заряд устройства.</li>
    </ul>
  ]},
  { id:'video', title:'FAQ по видеосвязи', icon:'/instructions/video.svg', body:[
    <ul key="ulv" className="list-disc pl-5 space-y-1">
      <li>Ссылка на звонок — в «Личном кабинете» в карточке записи.</li>
      <li>Поддерживаем Chrome / Safari / Edge последних версий.</li>
      <li>Разрешите доступ к камере/микрофону; наушники — лучше звук.</li>
      <li>Если нет видео/звука — перезайдите, закройте приложения, которые заняли камеру/микрофон.</li>
    </ul>
  ]},
  { id:'flags', title:'Красные флаги (когда онлайн недостаточно)', icon:'/instructions/flags.svg', body:[
    <ul key="ulf" className="list-disc pl-5 space-y-1">
      <li>Острая вялость, потеря сознания, судороги.</li>
      <li>Травма, кровотечение, падение с высоты.</li>
      <li>Затруднённое дыхание, синюшность слизистых.</li>
      <li>Многократная рвота с вялостью, неукротимая диарея.</li>
      <li>Отсутствие мочеиспускания &gt; 24 часов, болезненность живота.</li>
    </ul>,
    <p key="pf" className="mt-2"><b>Действие:</b> срочно обращайтесь в ближайшую клинику.</p>
  ]},
  { id:'after', title:'Что будет после консультации', icon:'/instructions/after.svg', body:[
    <p key="pa1">Вы получите план лечения в PDF и в «Личном кабинете». Чат открыт 24–48 часов для уточнений.</p>,
    <p key="pa2">Если состояние ухудшается — следуйте «красным флагам» и обращайтесь очно.</p>
  ]},
  { id:'payfail', title:'Проблемы с оплатой', icon:'/instructions/payfail.svg', body:[
    <ul key="ulp2" className="list-disc pl-5 space-y-1">
      <li>Проверьте 3‑D Secure/SMS‑подтверждение, баланс карты.</li>
      <li>Попробуйте другой браузер (Chrome/Safari) или СБП.</li>
      <li>При тайм‑ауте — попробуйте ещё раз через 2–3 минуты.</li>
    </ul>
  ]},
  { id:'videofail', title:'Проблемы с видеосвязью', icon:'/instructions/videofail.svg', body:[
    <ul key="ulv2" className="list-disc pl-5 space-y-1">
      <li>Разрешите доступ к камере/микрофону в настройках браузера/системы.</li>
      <li>Закройте все приложения, которые могут занимать камеру.</li>
      <li>Перезайдите по ссылке, перезагрузите страницу, проверьте интернет.</li>
    </ul>
  ]},
  { id:'upload', title:'Как загрузить фото/видео/анализы', icon:'/instructions/upload.svg', body:[
    <ul key="ulup" className="list-disc pl-5 space-y-1">
      <li>При записи есть блок «Файлы» — добавьте JPG/PNG/PDF/MP4.</li>
      <li>Фото — при свете, без фильтров; документы — читаемые.</li>
      <li>Если файл не прикрепляется — сожмите или отправьте через чат поддержки.</li>
    </ul>
  ]},
  { id:'refund', title:'Правила переноса/возврата', icon:'/instructions/refund.svg', body:[
    <ul key="ulr" className="list-disc pl-5 space-y-1">
      <li>Перенос более чем за 24 часа — бесплатно.</li>
      <li>Позже 24 часов — по правилам клиники (смотри оферту).</li>
      <li>Возврат — на тот же источник платежа в течение 1–7 дней.</li>
    </ul>
  ]},
];

function Item({ s, open, onToggle }:{ s:Section; open:boolean; onToggle:()=>void }){
  return (
    <div id={s.id} className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
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