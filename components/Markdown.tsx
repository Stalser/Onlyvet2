// components/Markdown.tsx
'use client';
import React from 'react';

/**
 * Very small markdown-to-HTML renderer without external deps.
 * Supports: headings (#, ##, ###), bold **, italic *, inline code ``, links [txt](url),
 * images ![alt](src), unordered lists (- or *), paragraphs.
 * Also sanitizes output to avoid raw HTML injection.
 */
export default function Markdown({ source }:{ source: string }){
  const html = React.useMemo(()=> renderMarkdown(source||''), [source]);
  return <div className="kb-body prose prose-neutral max-w-none" dangerouslySetInnerHTML={{__html: html}}/>;
}

// --- utils ---
const entity = (s:string)=> s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function renderMarkdown(src: string): string{
  // Normalize line endings
  let text = src.replace(/\r\n?/g,'\n');

  // images
  text = text.replace(/!\[([^\]]*)\]\(([^)\s]+)(?:\s+\"([^\"]*)\")?\)/g, (_m,alt,src,title)=>{
    return `<figure class="kb-img"><img src="${entity(src)}" alt="${entity(alt||'')}" />${title?`<figcaption>${entity(title)}</figcaption>`:''}</figure>`;
  });

  // links
  text = text.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, (_m,label,url)=>{
    return `<a href="${entity(url)}" target="_blank" rel="noopener">${entity(label)}</a>`;
  });

  // inline code
  text = text.replace(/`([^`]+)`/g, (_m,code)=>`<code>${entity(code)}</code>`);

  // bold / italic
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // headings (###, ##, #) — create ids
  let idx=0;
  text = text.split('\n').map(line=>{
    const h3 = line.match(/^###\s+(.+)/);
    if(h3){ const id='h3-'+(++idx); return `<h3 id="${id}" class="kb-h3">${entity(h3[1])}</h3>`; }
    const h2 = line.match(/^##\s+(.+)/);
    if(h2){ const id='h2-'+(++idx); return `<h2 id="${id}" class="kb-h2">${entity(h2[1])}</h2>`; }
    const h1 = line.match(/^#\s+(.+)/);
    if(h1){ return `<h2 class="kb-h2">${entity(h1[1])}</h2>`; } // нормализуем в h2
    return entity(line);
  }).join('\n');

  // unordered lists
  text = text.replace(/^(?:- |\* )(.*)(?:\n(?:(?:- |\* ).*)+)?/gms, (m)=>{
    const items = m.split('\n').map(l=>l.replace(/^(?:- |\* )/,'').trim()).filter(Boolean);
    if(items.length<=1) return m;
    return `<ul>${items.map(i=>`<li>${i}</li>`).join('')}</ul>`;
  });

  // paragraphs (split by blank lines)
  const blocks = text.split(/\n{2,}/).map(b=>b.trim()).filter(Boolean).map(b=>{
    if(/^<h[23]\b|^<ul>|^<figure\b|^<blockquote\b/.test(b)) return b;
    if(/^<p>/.test(b)) return b;
    return `<p>${b.replace(/\n/g,'<br/>')}</p>`;
  });
  return blocks.join('\n');
}
