// components/AccountNav.tsx
'use client';
import Link from 'next/link';

export default function AccountNav({current=''}:{current?:string}){
  const items = [
    {href:'/account', label:'Профиль'},
    {href:'/account#pets', label:'Питомцы'},
    {href:'/account#consultations', label:'Консультации'},
  ];
  return (
    <nav className="mb-6 flex gap-2 flex-wrap">
      {items.map(i=> (
        <Link key={i.href} href={i.href} className={`px-3 py-2 rounded-xl border text-sm ${current===i.href ? 'bg-[var(--teal)] text-white border-[var(--teal)]' : 'bg-white border-gray-200 hover:bg-[var(--cloud)]'}`}>
          {i.label}
        </Link>
      ))}
    </nav>
  );
}
