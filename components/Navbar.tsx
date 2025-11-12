// components/Navbar.tsx
'use client';
import React,{useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
const STORAGE_KEY='onlyvet:account';
type Acc={user?:{id:string;name:string;email:string}};
export default function Navbar(){
  const [menu,setMenu]=useState(false);
  const [auth,setAuth]=useState(false);
  const [mounted,setMounted]=useState(false);
  const lastY=useRef(0); const [hidden,setHidden]=useState(false);
  useEffect(()=>{const read=()=>{try{const raw=localStorage.getItem(STORAGE_KEY);const acc:Acc|null=raw?JSON.parse(raw):null;setAuth(!!acc?.user);}catch{setAuth(false);}};read();setMounted(true);const onStorage=(e:StorageEvent)=>{if(e.key===STORAGE_KEY)read();};window.addEventListener('storage',onStorage);return()=>window.removeEventListener('storage',onStorage);},[]);
  useEffect(()=>{const onScroll=()=>{if(menu)return;if(window.innerWidth>=768)return;const y=window.scrollY;const dy=y-lastY.current;lastY.current=y;if(Math.abs(dy)<6)return;setHidden(dy>0&&y>24);};window.addEventListener('scroll',onScroll,{passive:true} as any);return()=>window.removeEventListener('scroll',onScroll as any);},[menu]);
  const headerClass='bg-white sticky top-0 z-50 shadow-soft transition-transform duration-200 '+(hidden?'-translate-y-full':'translate-y-0');
  return(<header className={headerClass}>
    <div className="container flex items-center justify-between h-16">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo-icon.png" alt="OnlyVet" width={28} height={28} />
        <span className="font-semibold">OnlyVet</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm">
        <Link href="/services">Услуги</Link><Link href="/doctors">Врачи</Link><Link href="/contacts">Контакты</Link>
        {!mounted?null:(!auth?<Link href="/auth/login" className="btn btn-primary">Войти</Link>:<><Link href="/account" className="btn btn-secondary">Личный кабинет</Link><Link href="/booking" className="btn btn-primary">Записаться</Link></>)}
      </nav>
      <button className="md:hidden p-3 rounded-xl" onClick={()=>setMenu(v=>!v)} aria-label="Меню">
        <svg width="26" height="26" fill="none" stroke="currentColor"><path d="M3 6h20M3 13h20M3 20h20"/></svg>
      </button>
    </div>
    {menu&&(<div className="md:hidden fixed inset-0 z-[100] bg-white">
      <div className="container pt-4 pb-[max(20px,env(safe-area-inset-bottom))] flex flex-col min-h-screen overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Image src="/logo-icon.png" alt="OnlyVet" width={24} height={24} />
            <span className="font-semibold">OnlyVet</span>
          </div>
          <button className="p-3 rounded-xl" onClick={()=>setMenu(false)} aria-label="Закрыть">
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <Link href="/services" onClick={()=>setMenu(false)}>Услуги</Link>
          <Link href="/doctors" onClick={()=>setMenu(false)}>Врачи</Link>
          <Link href="/contacts" onClick={()=>setMenu(false)}>Контакты</Link>
          <Link href="/auth/login" className="btn btn-primary" onClick={()=>setMenu(false)}>Войти</Link>
          <Link href="/booking" className="btn btn-primary" onClick={()=>setMenu(false)}>Записаться</Link>
        </div>
        <div className="mt-auto pt-6 text-xs opacity-60">© OnlyVet</div>
      </div>
    </div>)}
  </header>);
}
