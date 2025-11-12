// components/ShareBar.tsx
'use client';
export default function ShareBar({ title }:{ title:string }){
  const share = (target:'vk'|'tg'|'copy') => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if(target==='copy'){
      navigator.clipboard?.writeText(url);
      alert('Ссылка скопирована');
      return;
    }
    const text = encodeURIComponent(title);
    const u = encodeURIComponent(url);
    const href = target==='vk'
      ? `https://vk.com/share.php?url=${u}&title=${text}`
      : `https://t.me/share/url?url=${u}&text=${text}`;
    window.open(href, '_blank','noopener,noreferrer');
  };
  return (
    <div className="sharebar">
      <button onClick={()=>share('vk')}>Поделиться VK</button>
      <button onClick={()=>share('tg')}>Поделиться TG</button>
      <button onClick={()=>share('copy')}>Скопировать</button>
    </div>
  );
}
