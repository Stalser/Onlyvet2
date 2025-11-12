// components/ArticleBody.tsx
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Lightbox from '@/components/Lightbox';

type Part = { type:'p'|'h2'|'h3'; text:string; id?:string };
type Img = { src:string; alt?:string; caption?:string };

export default function ArticleBody({ parts, images }:{ parts:Part[]; images:Img[] }){
  const [light, setLight] = useState<{src:string;alt?:string}|null>(null);
  const [active, setActive] = useState<string>('');

  // Track headings to highlight TOC (if anchors exist)
  const ids = useMemo(()=>parts.filter(p=>p.id).map(p=>p.id!) , [parts]);
  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible?.target?.id) setActive(visible.target.id);
    },{rootMargin:'-30% 0px -60% 0px', threshold:[0,0.2,0.6,1]});
    ids.forEach(id=>{ const el = document.getElementById(id); if(el) obs.observe(el); });
    return ()=>obs.disconnect();
  },[ids]);

  // expose active id for TOC via data-attr (page reads it)
  useEffect(()=>{ document.body.dataset.kbActive = active; },[active]);

  return (
    <>
      <article className="kb-body">
        {parts.map((el, i) => {
          if(el.type==='h2') return <h2 key={i} id={el.id} className="kb-h2">{el.text}</h2>;
          if(el.type==='h3') return <h3 key={i} id={el.id} className="kb-h3">{el.text}</h3>;
          return <p key={i}>{el.text}</p>;
        })}
        {images.length>1 && (
          <div className="kb-gallery">
            {images.map((img, i) => (
              <button key={i} className="kb-thumb" onClick={()=>setLight({src:img.src, alt:img.alt})} aria-label="Открыть изображение">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt={img.alt||('img-'+i)} />
              </button>
            ))}
          </div>
        )}
      </article>
      {light && <Lightbox src={light.src} alt={light.alt} onClose={()=>setLight(null)} />}
    </>
  );
}
