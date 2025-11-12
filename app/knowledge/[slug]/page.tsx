// app/knowledge/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import ArticleBody from '@/components/ArticleBody';
import ShareBar from '@/components/ShareBar';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

function autoExcerpt(content: string, limit = 160) {
  const clean = content.replace(/\s+/g, ' ').trim();
  return clean.slice(0, limit) + (clean.length > limit ? '…' : '');
}
function autoCover(images?: {src:string;alt?:string}[]) {
  if (images && images.length) return images[0].src;
  return '/kb/placeholder-cover.jpg';
}
function parseContent(content:string){
  const lines = content.split('\n');
  let htmlParts: {type:'p'|'h2'|'h3', text:string, id?:string}[] = [];
  let toc: {id:string; text:string; level:2|3}[] = [];
  let idx = 0;
  for(const raw of lines){
    const line = raw.trim();
    if(line.startsWith('### ')){
      const text = line.replace(/^###\s+/, '');
      const id = 'h3-' + (++idx);
      htmlParts.push({type:'h3', text, id});
      toc.push({id, text, level:3});
    } else if(line.startsWith('## ')){
      const text = line.replace(/^##\s+/, '');
      const id = 'h2-' + (++idx);
      htmlParts.push({type:'h2', text, id});
      toc.push({id, text, level:2});
    } else if(line===''){
      htmlParts.push({type:'p', text:''});
    } else {
      htmlParts.push({type:'p', text: line});
    }
  }
  return { htmlParts, toc };
}

export async function generateMetadata({ params }:{ params:{slug:string} }){
  const art = articles.find(a => a.slug === params.slug);
  if(!art) return {};
  const cover = autoCover(art.images as any);
  const desc = art.excerpt && art.excerpt.trim().length>0 ? art.excerpt : autoExcerpt(art.content);
  return {
    title: art.title + ' — OnlyVet',
    description: desc,
    openGraph: { title: art.title + ' — OnlyVet', description: desc, images: [cover] },
    twitter: { card: 'summary_large_image', title: art.title + ' — OnlyVet', description: desc, images: [cover] }
  };
}

export default function ArticlePage({ params }:{ params:{slug:string} }){
  const art = articles.find(a => a.slug === params.slug);
  if(!art) return notFound();
  const { htmlParts, toc } = parseContent(art.content);
  const cover = (art.images && art.images.length>0) ? (art.images[0].src) : '/kb/placeholder-cover.jpg';

  return (
    <section style={{background:'#f7f9fb'}}>
      <style jsx global>{`
        .kb-wrap{background:#f7f9fb}
        .kb-container{max-width:980px;margin:0 auto;padding:24px 16px 96px}
        .kb-breadcrumbs{display:flex;gap:8px;align-items:center;font-size:13px;margin-bottom:8px;color:#5b6b7f}
        .kb-breadcrumbs a{color:#334155;text-decoration:none}
        .kb-title{font-size:36px;line-height:1.15;margin:8px 0 12px;color:#0f172a;font-family:var(--font-montserrat, ui-sans-serif)}
        .kb-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
        .kb-tag{background:#eef2f7;border-radius:999px;padding:4px 10px;font-size:12px;color:#334155;border:1px solid #e5e7eb}

        .kb-hero{display:grid;grid-template-columns:1fr;gap:12px;margin:8px 0 14px}
        @media(min-width:900px){ .kb-hero{grid-template-columns:minmax(0,1fr) 320px;align-items:start} }
        .kb-hero-figure{border:1px solid #e5e7eb;border-radius:16px;overflow:hidden;background:#fff}
        .kb-hero-img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover;max-height:320px}
        .kb-hero-caption{font-size:12px;color:#5b6b7f;padding:8px 12px;background:#fff;border-top:1px solid #e5e7eb}
        .kb-toc-panel{border:1px solid #e5e7eb;background:#fff;border-radius:16px;padding:12px 14px}
        @media(min-width:900px){ .kb-toc-panel{max-height:340px;overflow:auto;position:sticky;top:96px} }
        .kb-toc-title{font-weight:700;margin-bottom:6px;color:#0f172a}
        .kb-toc-panel ul{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:6px}
        .kb-toc-panel li.lvl3{padding-left:12px}
        .kb-toc-panel a{color:#334155;text-decoration:none}
        .kb-toc-panel a:hover{text-decoration:underline}
        .kb-toc-collapsible{border:1px solid #e5e7eb;background:#fff;border-radius:16px;overflow:hidden;margin-bottom:12px}
        .kb-toc-collapsible summary{cursor:pointer; list-style:none; padding:12px 14px; font-weight:700; color:#0f172a}
        .kb-toc-collapsible summary::-webkit-details-marker{display:none}
        .kb-toc-collapsible .toc-body{padding:0 14px 12px}
        .kb-toc-collapsible ul{list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:6px}
        .kb-toc-collapsible li.lvl3{padding-left:12px}
        .kb-toc-collapsible a{color:#334155; text-decoration:none}
        .kb-toc-collapsible a:hover{text-decoration:underline}
        @media(min-width:900px){ .kb-toc-collapsible{display:none} }

        .kb-body{font-size:18px;line-height:1.7;color:#0f172a;background:#fff;padding:18px 20px;border-radius:16px;border:1px solid #e5e7eb}
        .kb-body p{margin:0 0 14px}
        .kb-h2{font-size:24px;margin:18px 0 8px}
        .kb-h3{font-size:19px;margin:12px 0 6px}

        .kb-bottom{display:flex;gap:10px;margin-top:12px}
        .kb-cta{display:inline-flex;align-items:center;justify-content:center;background:var(--coral,#e8664f);color:#fff;border-radius:12px;padding:10px 16px;font-weight:600;text-decoration:none;white-space:nowrap}
        .kb-back{display:inline-flex;align-items:center;justify-content:center;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:10px 16px;font-weight:600;text-decoration:none;color:#0f172a;margin-left:8px}

        .kb-related{margin-top:24px}
        .kb-related-title{font-weight:700;margin-bottom:10px}
        .kb-related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px}
        .kb-related-card{border:1px solid #e5e7eb;border-radius:12px;background:#fff;padding:12px}
        .kb-related-link{font-weight:600;color:#0f172a;text-decoration:none}
        .kb-related-link:hover{text-decoration:underline}
        .kb-related-meta{font-size:12px;opacity:.7;margin-top:4px}
      `}</style>

      <div className="kb-container">
        <div className="kb-breadcrumbs">
          <Link href="/knowledge">База знаний</Link>
          <span>·</span>
          <span className="muted">{art.category}</span>
        </div>

        <h1 className="kb-title">{art.title}</h1>

        {/* теги */}
        <div className="kb-tags">
          {art.tags?.map(t => <span key={t} className="kb-tag">#{t}</span>)}
        </div>

        {/* HERO: фото слева, TOC справа */}
        <div className="kb-hero">
          <figure className="kb-hero-figure">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt={art.images?.[0]?.alt || 'cover'} className="kb-hero-img" />
            {art.images?.[0]?.caption && <figcaption className="kb-hero-caption">{art.images?.[0]?.caption}</figcaption>}
          </figure>

          <nav className="kb-toc-panel">
            <div className="kb-toc-title">Содержание</div>
            <ul>
              {toc.length ? toc.map(i => (
                <li key={i.id} className={i.level===3?'lvl3':'lvl2'}>
                  <a href={`#${i.id}`}>{i.text}</a>
                </li>
              )) : <li className="lvl2"><span className="opacity-60">Нет оглавления</span></li>}
            </ul>
          </nav>
        </div>

        {/* collapsible TOC for mobile */}
        <details className="kb-toc-collapsible">
          <summary>Содержание</summary>
          <div className="toc-body">
            <ul>
              {toc.length ? toc.map(i => (
                <li key={i.id} className={i.level===3?'lvl3':'lvl2'}>
                  <a href={`#${i.id}`}>{i.text}</a>
                </li>
              )) : <li className="lvl2"><span className="opacity-60">Нет оглавления</span></li>}
            </ul>
          </div>
        </details>

        {/* Контент */}
        <ArticleBody parts={htmlParts} images={art.images || []} />

        <ShareBar title={art.title} />

        {/* CTA только внизу */}
        <div className="kb-bottom">
          <Link href="/booking" className="kb-cta">Записаться на консультацию</Link>
          <Link href="/knowledge" className="kb-back">К списку статей</Link>
        </div>

        {/* Похожие */}
        <div className="kb-related">
          <div className="kb-related-title">Похожие статьи</div>
          <div className="kb-related-grid">
            {articles
              .filter(a => a.slug!==art.slug && (a.category===art.category || a.tags.some(t=>art.tags.includes(t))))
              .slice(0,4)
              .map(a => (
                <article key={a.slug} className="kb-related-card">
                  <Link href={`/knowledge/${a.slug}`} className="kb-related-link">{a.title}</Link>
                  <div className="kb-related-meta">{a.category}</div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
