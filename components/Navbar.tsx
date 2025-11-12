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

  useEffect(()=>{
    const read=()=>{try{const raw=localStorage.getItem(STORAGE_KEY);const acc:Acc|null=raw?JSON.parse(raw):null;setAuth(!!acc?.user);}catch{setAuth(false);}};
    read(); setMounted(true);
    const onStorage=(e:StorageEvent)=>{ if(e.key===STORAGE_KEY) read(); };
    window.addEventListener('storage', onStorage);
    return ()=>window.removeEventListener('storage', onStorage);
  },[]);

  useEffect(()=>{
    const onScroll=()=>{
      if(menu) return;
      if(window.innerWidth>=768) return;
      const y=window.scrollY; const dy=y-lastY.current; lastY.current=y;
      if(Math.abs(dy)<6) return;
      setHidden(dy>0 && y>24);
    };
    window.addEventListener('scroll', onScroll as any, { passive:true } as any);
    return ()=>window.removeEventListener('scroll', onScroll as any);
  },[menu]);

  const headerClass='bg-white sticky top-0 z-50 shadow-soft transition-transform duration-200 '+(hidden?'-translate-y-full':'translate-y-0');

  const Links = ({vertical=false}:{vertical?:boolean}) => (
    <div className={vertical?'flex flex-col gap-3':'flex items-center gap-6 text-sm'}>
      <Link href="/about" onClick={()=>setMenu(false)}>О нас</Link>
      <Link href="/pricing" onClick={()=>setMenu(false)}>Цены</Link>
      <Link href="/services" onClick={()=>setMenu(false)}>Услуги</Link>
      <Link href="/knowledge" onClick={()=>setMenu(false)}>База знаний</Link>
      <Link href="/red-flags" onClick={()=>setMenu(false)}>Красные флаги</Link>
      <Link href="/contacts" onClick={()=>setMenu(false)}>Контакты</Link>
      {!mounted? null : (
        !auth ? <Link href="/auth/login" className="btn btn-primary" onClick={()=>setMenu(false)}>Войти</Link> :
        <>
          <Link href="/account" className="btn btn-secondary" onClick={()=>setMenu(false)}>Личный кабинет</Link>
          <Link href="/booking" className="btn btn-primary" onClick={()=>setMenu(false)}>Записаться</Link>
        </>
      )}
    </div>
  );

  return (
    <header className={headerClass}>
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo-icon.svg" alt="OnlyVet" width={40} height={40} priority />
          <span className="font-semibold" style={{fontSize: '20px'}}>OnlyVet</span>
        </Link>
        <nav className="hidden md:block">
          <Links />
        </nav>
        <button className="md:hidden p-3 rounded-xl" onClick={()=>setMenu(v=>!v)} aria-label="Меню">
          <svg width="26" height="26" fill="none" stroke="currentColor"><path d="M3 6h20M3 13h20M3 20h20"/></svg>
        </button>
      </div>
      {menu && (
        <div className="md:hidden fixed inset-0 z-[100] bg-white">
          <div className="container pt-4 pb-[max(20px,env(safe-area-inset-bottom))] flex flex-col min-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image src="/logo-icon.svg" alt="OnlyVet" width={28} height={28} />
                <span className="font-semibold" style={{fontSize:'18px'}}>OnlyVet</span>
              </div>
              <button className="p-3 rounded-xl" onClick={()=>setMenu(false)} aria-label="Закрыть">
                <svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2"/></svg>
              </button>
            </div>
            <Links vertical />
            <div className="mt-auto pt-6 text-xs opacity-60">© OnlyVet</div>
          </div>
        </div>
      )}
    </header>
  );
}
