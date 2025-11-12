// components/Navbar.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';

const STORAGE_KEY = 'onlyvet:account';
type Acc = { user?: { id: string; name: string; email: string } };

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [auth, setAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  // DIAGNOSTIC MARK
  const VERSION = 'v15';

  useEffect(() => {
    const read = () => {
      try { const raw = localStorage.getItem(STORAGE_KEY); const acc: Acc | null = raw ? JSON.parse(raw) : null; setAuth(!!acc?.user); }
      catch { setAuth(false); }
    };
    read(); setMounted(true);
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) read(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let el = document.getElementById('menu-portal') as HTMLElement | null;
    if (!el) { el = document.createElement('div'); el.id = 'menu-portal'; document.body.appendChild(el); }
    setPortalEl(el);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const html = document.documentElement;
    const body = document.body;
    if (menu) {
      console.log('[OnlyVet Navbar %s] open menu', VERSION);
      const y = window.scrollY || 0;
      body.dataset.scrollY = String(y);
      html.classList.add('modal-open');
      body.classList.add('modal-open');
      body.style.top = `-${y}px`;
      body.style.position = 'fixed';
      body.style.width = '100%';
    } else {
      const y = parseInt(body.dataset.scrollY || '0', 10) || 0;
      html.classList.remove('modal-open');
      body.classList.remove('modal-open');
      body.style.position = ''; body.style.top = ''; body.style.width = '';
      delete body.dataset.scrollY;
      window.scrollTo(0, y);
    }
    return () => {
      html.classList.remove('modal-open');
      body.classList.remove('modal-open');
      body.style.position = ''; body.style.top = ''; body.style.width = '';
      delete body.dataset.scrollY;
    };
  }, [menu, mounted]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && menu) setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  const startY = useRef<number | null>(null);
  const [pull, setPull] = useState(0);
  const THRESH = 80;
  const onTouchStart = (e: React.TouchEvent) => { startY.current = e.touches[0].clientY; setPull(0); };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startY.current == null) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) { e.preventDefault(); setPull(Math.min(dy, 140)); }
  };
  const onTouchEnd = () => { if (pull >= THRESH) setMenu(false); setPull(0); startY.current = null; };

  const Links = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={vertical ? 'flex flex-col gap-3' : 'flex items-center gap-6 text-sm'}>
      <Link href="/about" onClick={() => setMenu(false)}>О нас</Link>
      <Link href="/pricing" onClick={() => setMenu(false)}>Цены</Link>
      <Link href="/services" onClick={() => setMenu(false)}>Услуги</Link>
      <Link href="/knowledge" onClick={() => setMenu(false)}>База знаний</Link>
      <Link href="/red-flags" onClick={() => setMenu(false)}>Красные флаги</Link>
      <Link href="/contacts" onClick={() => setMenu(false)}>Контакты</Link>
      {!auth ? <Link href="/auth/login" className="btn btn-primary" onClick={() => setMenu(false)}>Войти</Link> :
        <><Link href="/account" className="btn btn-secondary" onClick={() => setMenu(false)}>Личный кабинет</Link>
          <Link href="/booking" className="btn btn-primary" onClick={() => setMenu(false)}>Записаться</Link></>}
    </div>
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-white shadow-soft" data-navbar-version={VERSION}>
        <div className="container flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-icon.svg" alt="OnlyVet" width={40} height={40} priority />
            <span className="font-semibold" style={{ fontSize: 20 }}>OnlyVet • {VERSION}</span>
          </Link>
          <nav className="hidden md:block"><Links /></nav>
          <button className="md:hidden p-3 rounded-xl" onClick={() => setMenu(true)} aria-label="Открыть меню">
            <svg width="26" height="26" fill="none" stroke="currentColor"><path d="M3 6h20M3 13h20M3 20h20"/></svg>
          </button>
        </div>
      </header>

      {menu && portalEl && createPortal(
        <>
          <div className="fixed inset-0 z-[9998] bg-black/40" onClick={() => setMenu(false)} aria-hidden="true"/>
          <div
            className="fixed inset-0 z-[9999] overflow-y-auto bg-white"
            style={{ height: '100dvh', WebkitOverflowScrolling: 'auto', transform: pull ? `translateY(${pull}px)` : 'translateY(0)', transition: pull ? 'none' : 'transform .15s ease-out' }}
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
          >
            <div style={{ width: 44, height: 5, borderRadius: 999, background: 'rgba(0,0,0,.25)', margin: '10px auto' }} />
            <div className="container pt-[max(6px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))] flex flex-col min-h-[100dvh]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Image src="/logo-icon.svg" alt="OnlyVet" width={28} height={28} />
                  <span className="font-semibold" style={{ fontSize: 18 }}>OnlyVet</span>
                </div>
                <button className="p-3 rounded-xl hover:bg-[var(--cloud)] active:opacity-80" onClick={() => setMenu(false)} aria-label="Закрыть меню">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <Links vertical />
              <div className="mt-auto pt-6 text-xs opacity-60">© OnlyVet</div>
            </div>
          </div>
        </>,
        portalEl
      )}
    </>
  );
}
