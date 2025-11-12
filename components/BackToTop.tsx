// components/BackToTop.tsx
'use client';
import { useEffect, useState } from 'react';

export default function BackToTop(){
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const onScroll=()=> setShow(window.scrollY>600);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    return ()=>window.removeEventListener('scroll', onScroll);
  },[]);
  return (
    <div className={`kb-top ${show?'show':''}`}>
      <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Наверх">↑</button>
    </div>
  );
}
