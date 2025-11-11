// components/Navbar.tsx
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'onlyvet:account';

type AccountShape = {
  user?: { id: string; name: string; email: string };
  pets?: any[];
  consultations?: any[];
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasUser, setHasUser] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const acc: AccountShape | null = raw ? JSON.parse(raw) : null;
        setHasUser(!!acc?.user);
      } catch {
        setHasUser(false);
      }
    };
    read();
    setMounted(true);
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) read();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function logout() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const acc: AccountShape = raw ? JSON.parse(raw) : { pets: [], consultations: [] };
      acc.user = undefined;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(acc));
    } catch {}
    window.location.href = '/';
  }

  const NavLinks = () => (
    <>
      <Link href="/about">О нас</Link>
      <Link href="/pricing">Цены</Link>
      <Link href="/services">Услуги</Link>
      <Link href="/knowledge">База знаний</Link>
      <Link href="/red-flags">Красные флаги</Link>
      <Link href="/contacts">Контакты</Link>
      {mounted && (
        hasUser ? (
          <>
            <Link href="/account" className="btn btn-secondary">Личный кабинет</Link>
            <button onClick={logout} className="btn bg-white border border-gray-200 rounded-xl px-4 py-2">Выйти</button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className="btn btn-primary">Войти</Link>
            <Link href="/auth/register" className="btn bg-white border border-gray-200 rounded-xl px-4 py-2">Регистрация</Link>
          </>
        )
      )}
      <Link href="/booking" className="btn btn-primary">Записаться</Link>
    </>
  );

  return (
    <header className="bg-white sticky top-0 z-50 shadow-soft">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="OnlyVet" width={36} height={36} />
          <span className="font-semibold" style={{ fontFamily: 'var(--font-montserrat)' }}>OnlyVet</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLinks />
        </nav>
        <button className="md:hidden p-2" onClick={() => setMenuOpen(v => !v)} aria-label="Меню">
          <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-4 flex flex-col gap-3">
            <NavLinks />
          </div>
        </div>
      )}
    </header>
  );
}
