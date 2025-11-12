// app/knowledge/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import Markdown from '@/components/Markdown';

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

// Extract simple TOC from markdown headings
function parseTOC(md: string){
  const lines = md.split(/\r?\n/);
  let toc: {id:string; text:string; level:2|3}[] = [];
  let idx = 0;
  for(const raw of lines){
    const h3 = raw.match(/^###\s+(.+)/); if(h3){ toc.push({id:'h3-'+(++idx), text:h3[1], level:3}); continue; }
    const h2 = raw.match(/^##\s+(.+)/);  if(h2){ toc.push({id:'h2-'+(++idx), text:h2[1], level:2}); continue; }
  }
  return toc;
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
  const cover = autoCover(art.images as any);
  const toc = parseTOC(art.content);

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
              {toc.map(i => (
                <li key={i.id} className={i.level===3?'lvl3':'lvl2'}>
                  <a href={`#${i.id}`}>{i.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Body (markdown to HTML, no external deps) */}
        <Markdown source={art.content} />

        <div className="kb-bottom">
          <Link href="/booking" className="kb-cta">Записаться на консультацию</Link>
          <Link href="/knowledge" className="kb-back">К списку статей</Link>
        </div>
      </div>
    </section>
  );
}
