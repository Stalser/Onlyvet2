'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const Nav = () => (
    <>
      <Link href="/about">О нас</Link>
      <Link href="/pricing">Цены</Link>
      <Link href="/knowledge">База знаний</Link>
      <Link href="/red-flags">Красные флаги</Link>
      <Link href="#faq">FAQ</Link>
      <Link href="#feedback">Контакты</Link>
      <Link href="/account">Личный кабинет</Link>
      <Link href="/booking" className="btn btn-primary">Записаться</Link>
    </>
  );
  return (
    <header className="bg-white sticky top-0 z-50 shadow-soft">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="OnlyVet" width={36} height={36} />
          <span className="font-semibold" style={{fontFamily: 'var(--font-montserrat)'}}>OnlyVet</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Nav />
        </nav>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Меню">
          <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white">
          <div className="container py-4 flex flex-col gap-3">
            <Nav />
          </div>
        </div>
      )}
    </header>
  );
}
