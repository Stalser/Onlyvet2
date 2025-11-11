'use client';
import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const ok = typeof window !== 'undefined' && localStorage.getItem('onlyvet:cookie') === '1';
    if (!ok) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50">
      <div className="container">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-soft p-4 flex items-start gap-4">
          <div className="text-sm opacity-90">
            Мы используем файлы cookie для улучшения работы сервиса.
            Нажимая «Ок», вы соглашаетесь с нашей <a className="text-teal underline" href="/privacy">Политикой конфиденциальности</a>.
          </div>
          <div className="ml-auto flex gap-2">
            <button className="btn btn-secondary" onClick={()=>{ localStorage.setItem('onlyvet:cookie','1'); setShow(false); }}>Ок</button>
          </div>
        </div>
      </div>
    </div>
  );
}
