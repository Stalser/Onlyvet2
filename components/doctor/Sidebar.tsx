// components/doctor/Sidebar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar(){
  const pathname = usePathname();
  const Item = ({ href, label }:{href:string; label:string}) => (
    <Link href={href} className={`block px-3 py-2 rounded-xl ${pathname===href? 'bg-[var(--cloud)] font-semibold' : 'hover:bg-[var(--cloud)]'}`}>{label}</Link>
  );
  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-20 space-y-1">
        <Item href="/doctor" label="Рабочий стол" />
        <Item href="/doctor/schedule" label="График" />
        <Item href="/doctor/patients" label="Пациенты" />
        <Item href="/doctor/settings" label="Настройки" />
      </div>
    </aside>
  );
}
