// components/TOC.tsx
'use client';
import { useEffect, useState } from 'react';

type Item = { id: string; text: string; level: 2|3 };

export default function TOC({ items, className }:{ items: Item[]; className?: string }){
  const [active, setActive] = useState('');

  // read active heading id from ArticleBody (it writes into body.dataset.kbActive)
  useEffect(()=>{
    const id = document.body.dataset.kbActive || '';
    setActive(id);
    const int = setInterval(()=>{
      const cur = document.body.dataset.kbActive || '';
      if(cur !== active) setActive(cur);
    }, 200);
    return ()=>clearInterval(int);
  }, [active]);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if(el){ el.scrollIntoView({ behavior:'smooth', block:'start' }); history.replaceState(null,'',`#${id}`); }
  };

  return (
    <ul className={className}>
      {items.length ? items.map(i => (
        <li key={i.id} className={i.level===3 ? 'lvl3' : undefined}>
          <a
            href={`#${i.id}`}
            onClick={(e)=>onClick(e, i.id)}
            className={`tocLink ${active===i.id ? 'active' : ''}`}
          >
            {i.text}
          </a>
        </li>
      )) : <li><span className="opacity-60">Нет оглавления</span></li>}
    </ul>
  );
}
