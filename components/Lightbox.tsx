// components/Lightbox.tsx
'use client';
import { useEffect } from 'react';

export default function Lightbox({ src, alt, onClose }:{ src:string; alt?:string; onClose:()=>void }){
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return ()=>window.removeEventListener('keydown', onKey);
  },[onClose]);
  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 flex items-center justify-center" onClick={onClose}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt||'image'} className="max-w-[95vw] max-h-[95vh] object-contain" onClick={e=>e.stopPropagation()} />
      <button className="absolute top-3 right-3 p-3 rounded-xl bg-black/40 text-white" onClick={onClose} aria-label="Закрыть">✕</button>
    </div>
  );
}
