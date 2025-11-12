// app/knowledge/[slug]/page.tsx
import '@/app/kb.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import ArticleBody from '@/components/ArticleBody';
import ShareBar from '@/components/ShareBar';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

/** helpers */
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
  const cover = autoCover(art.images as any);

  return (
    <section className="kb-wrap">
      <div className="kb-container">
        <div className="kb-breadcrumbs">
          <Link href="/knowledge">База знаний</Link>
          <span>·</span>
          <span className="muted">{art.category}</span>
        </div>

        <h1 className="kb-title">{art.title}</h1>

        <div className="kb-meta">
          <div className="kb-tags">
            {art.tags?.map(t => <span key={t} className="kb-tag">#{t}</span>)}
          </div>
          <div className="grow" />
          <Link href="/booking" className="kb-cta">Записаться на консультацию</Link>
        </div>

        {cover && (
          <figure className="kb-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt={art.images?.[0]?.alt || 'cover'} className="kb-cover-img" />
            {art.images?.[0]?.caption && <figcaption className="kb-caption">{art.images?.[0]?.caption}</figcaption>}
          </figure>
        )}

        {toc.length>0 && (
          <nav className="kb-toc">
            <div className="kb-toc-title">Содержание</div>
            <ul>
              {toc.map(i => {
                const active = (typeof document !== 'undefined' ? document.body.dataset.kbActive : '') === i.id;
                return (
                  <li key={i.id} className={i.level===3?'lvl3':'lvl2'}>
                    <a className={active?'active':''} href={`#${i.id}`}>{i.text}</a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}

        <ArticleBody parts={htmlParts} images={art.images || []} />

        <ShareBar title={art.title} />

        <div className="kb-bottom">
          <Link href="/booking" className="kb-cta">Записаться на консультацию</Link>
          <Link href="/knowledge" className="kb-back">К списку статей</Link>
        </div>

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
