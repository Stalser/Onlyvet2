// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Navbar(){
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setHidden(y > lastY && y > 64);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  const closeMenu = () => setMenuOpen(false);

  const NavLinks = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={vertical ? 'flex flex-col gap-3' : 'flex items-center gap-5'}>
      <Link href="/" onClick={closeMenu}>Главная</Link>
      <Link href="/doctors" onClick={closeMenu}>Врачи</Link>
      <Link href="/services" onClick={closeMenu}>Услуги и цены</Link>
      <Link href="/instructions" onClick={closeMenu}>Инструкции</Link>
      <Link href="/docs" onClick={closeMenu}>Документы</Link>
      <Link href="/auth/login" className="btn btn-primary rounded-xl px-4 text-sm" onClick={closeMenu}>
        Войти
      </Link>
    </div>
  );

  return (
    <header className={
      `bg-white shadow-soft sticky top-0 z-50 transition-transform duration-200 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`
    }>
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
          <Image src="/logo.svg" alt="OnlyVet" width={32} height={32} className="sm:w-9 sm:h-9" />
          <span className="font-semibold">OnlyVet</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:block">
          <NavLinks />
        </nav>

        {/* Mobile burger */}
        <button
          className="md:hidden p-3 rounded-xl"
          aria-label="Меню"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h20M3 13h20M3 20h20" />
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-white md:hidden"
          role="dialog"
          aria-modal="true"
          onClick={closeMenu}
        >
          <div
            className="container pt-4 pb-6 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="OnlyVet" width={28} height={28} />
                <span className="font-semibold">OnlyVet</span>
              </div>
              <button className="p-3 rounded-xl" aria-label="Закрыть" onClick={closeMenu}>
                <svg width="22" height="22" viewBox="0 0 24 24">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <NavLinks vertical />
          </div>
        </div>
      )}
    </header>
  );
}
