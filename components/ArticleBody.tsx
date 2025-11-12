// components/ArticleBody.tsx
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import Lightbox from '@/components/Lightbox';

type Part = { type:'p'|'h2'|'h3'; text:string; id?:string };
type Img = { src:string; alt?:string; caption?:string };

const isNote = (t:string)=> t.startsWith('::note ');
const isWarn = (t:string)=> t.startsWith('::warn ') || t.startsWith('::warning ');

export default function ArticleBody({ parts, images }:{ parts:Part[]; images:Img[] }){
  const [light, setLight] = useState<{src:string;alt?:string}|null>(null);
  const [active, setActive] = useState<string>('');
  const ids = useMemo(()=>parts.filter(p=>p.id).map(p=>p.id!) , [parts]);

  useEffect(()=>{
    const obs = new IntersectionObserver((entries)=>{
      const visible = entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
      if(visible?.target?.id) setActive(visible.target.id);
    },{rootMargin:'-30% 0px -60% 0px', threshold:[0,0.2,0.6,1]});
    ids.forEach(id=>{ const el = document.getElementById(id); if(el) obs.observe(el); });
    return ()=>obs.disconnect();
  },[ids]);

  useEffect(()=>{ document.body.dataset.kbActive = active; },[active]);

  const copyAnchor = (hash:string)=>{
    try{
      const url = window.location.origin + window.location.pathname + hash;
      navigator.clipboard?.writeText(url);
      const a = document.querySelector(`a[href='${hash}']`);
      if(a) a.classList.add('copied');
      setTimeout(()=>{ if(a) a.classList.remove('copied'); }, 1200);
    }catch{}
  };

  return (
    <>
      <article className="kb-body">
        {parts.map((el, i) => {
          if(el.type==='h2' || el.type==='h3'){
            const Tag:any = el.type;
            const hash = el.id ? `#${el.id}` : undefined;
            return (
              <Tag key={i} id={el.id} className={el.type==='h2'?'kb-h2':'kb-h3'}>
                {el.text}
                {hash && <a className="kb-anchor" href={hash} onClick={(e)=>{e.preventDefault();document.getElementById(el.id!)?.scrollIntoView({behavior:'smooth'});copyAnchor(hash);}}>#</a>}
              </Tag>
            );
          }
          // callouts
          if(isNote(el.text)){
            const body = el.text.replace(/^::note\s+/,'').trim();
            return (
              <div key={i} className="kb-callout note">
                <div className="title">Примечание</div>
                <div>{body}</div>
              </div>
            );
          }
          if(isWarn(el.text)){
            const body = el.text.replace(/^::warn(?:ing)?\s+/,'').trim();
            return (
              <div key={i} className="kb-callout warn">
                <div className="title">Важно</div>
                <div>{body}</div>
              </div>
            );
          }
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
