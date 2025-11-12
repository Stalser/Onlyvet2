// components/Navbar.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'onlyvet:account';
type AccountShape = { user?: { id: string; name: string; email: string } };

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const acc: AccountShape | null = raw ? JSON.parse(raw) : null;
        setHasUser(!!acc?.user);
      } catch { setHasUser(false); }
    };
    read();
    setMounted(true);
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) read(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (menuOpen) return;
      if (window.innerWidth >= 768) return;
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      if (Math.abs(dy) < 6) return;
      setHidden(dy > 0 && y > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [menuOpen]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (menuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prev || '';
    return () => { document.body.style.overflow = prev || ''; };
  }, [menuOpen]);

  function logout() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const acc = raw ? JSON.parse(raw) : {};
      acc.user = undefined;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acc));
    } catch {}
    window.location.href = '/';
  }

  const NavLinks = ({ vertical=false }:{vertical?:boolean}) => (
    <div className={vertical ? 'flex flex-col gap-3' : 'flex items-center gap-5'}>
      <Link href="/about" onClick={()=>setMenuOpen(false)}>О нас</Link>
      <Link href="/pricing" onClick={()=>setMenuOpen(false)}>Цены</Link>
      <Link href="/services" onClick={()=>setMenuOpen(false)}>Услуги</Link>
      <Link href="/knowledge" onClick={()=>setMenuOpen(false)}>База знаний</Link>
      <Link href="/red-flags" onClick={()=>setMenuOpen(false)}>Красные флаги</Link>
      <Link href="/contacts" onClick={()=>setMenuOpen(false)}>Контакты</Link>

      {mounted && (
        hasUser ? (
          <div className={vertical ? 'flex flex-col gap-2' : 'flex items-center gap-2'}>
            <Link href="/account" className="btn btn-secondary w-full sm:w-auto" onClick={()=>setMenuOpen(false)}>Личный кабинет</Link>
            <button onClick={logout} className="btn bg-white border border-gray-200 rounded-xl px-4 py-2 w-full sm:w-auto">Выйти</button>
          </div>
        ) : (
          // Гостю показываем только «Войти», без «Регистрация»
          <div className={vertical ? 'flex flex-col gap-2' : 'flex items-center gap-2'}>
            <Link href="/auth/login" className="btn btn-primary w-full sm:w-auto" onClick={()=>setMenuOpen(false)}>Войти</Link>
          </div>
        )
      )}

      <Link href="/booking" className="btn btn-primary w-full sm:w-auto" onClick={()=>setMenuOpen(false)}>Записаться</Link>
    </div>
  );

  return (
    <header className={\`bg-white sticky top-0 z-50 shadow-soft transition-transform duration-200 \${hidden ? '-translate-y-full' : 'translate-y-0'}\`}>
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="OnlyVet" width={32} height={32} className="sm:w-9 sm:h-9" />
          <span className="font-semibold text-base sm:text-lg" style={{ fontFamily: 'var(--font-montserrat)' }}>OnlyVet</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLinks />
        </nav>

        <button
          className="md:hidden p-3 rounded-xl hover:bg-[var(--cloud)] active:opacity-80"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Меню"
        >
          <svg width="26" height="26" fill="none" stroke="currentColor"><path d="M3 6h20M3 13h20M3 20h20"/></svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-white">
          <div className="container pt-4 pb-[max(20px,env(safe-area-inset-bottom))] flex flex-col min-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="OnlyVet" width={28} height={28} />
                <span className="font-semibold" style={{ fontFamily: 'var(--font-montserrat)' }}>OnlyVet</span>
              </div>
              <button className="p-3 rounded-xl hover:bg-[var(--cloud)]" onClick={()=>setMenuOpen(false)} aria-label="Закрыть">
                <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
              </button>
            </div>

            <NavLinks vertical />

            <div className="mt-auto pt-6 text-xs opacity-60">© OnlyVet</div>
          </div>
        </div>
      )}
    </header>
  );
}
