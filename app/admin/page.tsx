// app/admin/page.tsx
'use client';
import Link from 'next/link';
export default function AdminHome(){
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <h3 className="font-semibold mb-2" style={{color:'var(--navy)'}}>Сотрудники (врачи)</h3>
        <p className="opacity-80 text-sm mb-3">Регистрация врача доступна только администратору.</p>
        <Link href="/admin/doctors" className="btn btn-primary rounded-xl px-3">Открыть</Link>
      </div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <h3 className="font-semibold mb-2" style={{color:'var(--navy)'}}>Интеграция Vetmanager</h3>
        <p className="opacity-80 text-sm mb-3">Добавьте токен и домен. Проверьте соединение.</p>
        <Link href="/admin/vetmanager" className="btn bg-white border border-gray-300 rounded-xl px-3">Настроить</Link>
      </div>
    </div>
  );
}
