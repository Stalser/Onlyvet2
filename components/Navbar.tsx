// components/Navbar.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const STORAGE_KEY = 'onlyvet:account';
type Acc = { user?: { id: string; name: string; email: string } };

export default function Navbar() {
  const [menu, setMenu] = useState(false);
  const [auth, setAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastY = useRef(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // swipe-to-close state
  const startY = useRef<number | null>(null);
  const [pull, setPull] = useState(0);
  const THRESH = 80;

  // ===== helpers: scroll lock strict (html + body) =====
  const lockScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const html = document.documentElement;
    const body = document.body;
    html.classList.add('modal-open');
    body.classList.add('modal-open');
    body.setAttribute('data-scroll-y', String(y));
    body.style.top = `-${y}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.position = 'fixed';
  };
  const unlockScroll = () => {
    const html = document.documentElement;
    const body = document.body;
    const y = parseInt(body.getAttribute('data-scroll-y') || '0', 10) || 0;
    html.classList.remove('modal-open');
    body.classList.remove('modal-open');
    body.style.position = '';
    body.style.top = '';
    body.style.left = '';
    body.style.right = '';
    body.style.width = '';
    body.removeAttribute('data-scroll-y');
    window.scrollTo(0, y);
  };

  // ===== read auth state =====
  useEffect(() => {
    const read = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const acc: Acc | null = raw ? JSON.parse(raw) : null;
        setAuth(!!acc?.user);
      } catch {
        setAuth(false);
      }
    };
    read();
    setMounted(true);
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) read(); };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // ===== header autohide and blur =====
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 4);
      if (menu) return;
      if (window.innerWidth >= 768) return;
      const y = window.scrollY;
      const dy = y - lastY.current;
      lastY.current = y;
      if (Math.abs(dy) < 6) return;
      setHidden(dy > 0 && y > 24);
    };
    window.addEventListener('scroll', onScroll as any, { passive: true } as any);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll as any);
  }, [menu]);

  // open/close effects
  useEffect(() => {
    if (menu) lockScroll();
    else unlockScroll();
    return () => { unlockScroll(); };
  }, [menu]);

  // ESC close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && menu) setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menu]);

  // touch handlers
  const onTouchStart = (e: React.TouchEvent) => { startY.current = e.touches[0].clientY; setPull(0); };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startY.current == null) return;
    const dy = e.touches[0].clientY - startY.current;
    if (dy > 0) {
      e.preventDefault();
      setPull(Math.min(dy, 140));
    }
  };
  const onTouchEnd = () => { if (pull >= THRESH) setMenu(false); setPull(0); startY.current = null; };

  const baseHeader = 'sticky top-0 z-50 transition-transform duration-200';
  const transform = hidden ? '-translate-y-full' : 'translate-y-0';
  const chromeStyle: React.CSSProperties = scrolled
    ? { background: '#fff', boxShadow: '0 8px 24px rgba(26,37,48,.08)' }
    : { background: '#fff' };

  const Links = ({ vertical = false }: { vertical?: boolean }) => (
    <div className={vertical ? 'flex flex-col gap-3' : 'flex items-center gap-6 text-sm'}>
      <Link href="/about" onClick={() => setMenu(false)}>О нас</Link>
      <Link href="/pricing" onClick={() => setMenu(false)}>Цены</Link>
      <Link href="/services" onClick={() => setMenu(false)}>Услуги</Link>
      <Link href="/knowledge" onClick={() => setMenu(false)}>База знаний</Link>
      <Link href="/red-flags" onClick={() => setMenu(false)}>Красные флаги</Link>
      <Link href="/contacts" onClick={() => setMenu(false)}>Контакты</Link>
      {!mounted ? null : (
        !auth ? <Link href="/auth/login" className="btn btn-primary" onClick={() => setMenu(false)}>Войти</Link> :
          <>
            <Link href="/account" className="btn btn-secondary" onClick={() => setMenu(false)}>Личный кабинет</Link>
            <Link href="/booking" className="btn btn-primary" onClick={() => setMenu(false)}>Записаться</Link>
          </>
      )}
    </div>
  );

  // grab handle style
  const handleStyle: React.CSSProperties = {
    width: 44, height: 5, borderRadius: 999,
    background: 'rgba(0,0,0,.18)', margin: '8px auto'
  };

  return (
    <header className={baseHeader + ' ' + transform} style={chromeStyle}>
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.svg" alt="OnlyVet" width={40} height={40} priority />
          <span className="font-semibold" style={{ fontSize: '20px' }}>OnlyVet</span>
        </Link>
        <nav className="hidden md:block">
          <Links />
        </nav>
        <button className="md:hidden p-3 rounded-xl" onClick={() => setMenu(true)} aria-label="Меню">
          <svg width="26" height="26" fill="none" stroke="currentColor"><path d="M3 6h20M3 13h20M3 20h20" /></svg>
        </button>
      </div>

      {menu && (
        <>
          {/* backdrop */}
          <div className="fixed inset-0 z-[9998] bg-white" onClick={() => setMenu(false)} />
          {/* panel */}
          <div
            className="fixed inset-0 z-[9999]"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            style={{
              transform: pull ? `translateY(${pull}px)` : 'translateY(0)',
              transition: pull ? 'none' : 'transform .15s ease-out',
            }}
          >
            <div className="container pt-[max(16px,env(safe-area-inset-top))] pb-[max(20px,env(safe-area-inset-bottom))] flex flex-col min-h-screen overflow-y-auto">
              <div style={handleStyle} />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Image src="/logo-icon.svg" alt="OnlyVet" width={28} height={28} />
                  <span className="font-semibold" style={{ fontSize: '18px' }}>OnlyVet</span>
                </div>
                <button className="p-3 rounded-xl" onClick={() => setMenu(false)} aria-label="Закрыть">
                  <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" /></svg>
                </button>
              </div>
              <Links vertical />
              <div className="mt-auto pt-6 text-xs opacity-60">© OnlyVet</div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
