// app/knowledge/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import Lightbox from '@/components/Lightbox';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

// Helper: get auto excerpt and cover when missing
function autoExcerpt(content: string, limit = 160) {
  const clean = content.replace(/\s+/g, ' ').trim();
  return clean.slice(0, limit) + (clean.length > limit ? '…' : '');
}
function autoCover(images?: {src:string;alt?:string}[]) {
  if (images && images.length) return images[0].src;
  return '/kb/placeholder-cover.jpg';
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

// naive TOC: headings start with "## " or "### "
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

export default function ArticlePage({ params }:{ params:{slug:string} }){
  const art = articles.find(a => a.slug === params.slug) as any;
  if(!art) return notFound();
  const { htmlParts, toc } = parseContent(art.content);
  const cover = autoCover(art.images);

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
            {art.tags?.map((t:string) => <span key={t} className="kb-tag">#{t}</span>)}
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

        <ArticleBody parts={htmlParts} images={art.images||[]} />

        <div className="kb-bottom">
          <Link href="/booking" className="kb-cta">Записаться на консультацию</Link>
          <Link href="/knowledge" className="kb-back">К списку статей</Link>
        </div>

        <Related currentSlug={art.slug} category={art.category} tags={art.tags} />
      </div>
    </section>
  );
}

function ArticleBody({ parts, images }:{ parts:{type:'p'|'h2'|'h3',text:string,id?:string}[]; images:{src:string;alt?:string;caption?:string}[] }){
  'use client';
  const [light, setLight] = useState<{src:string;alt?:string}|null>(null);
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

function Related({ currentSlug, category, tags }:{ currentSlug:string; category:string; tags:string[] }){
  const rel = articles
    .filter(a => a.slug!==currentSlug && (a.category===category || a.tags.some(t=>tags.includes(t))))
    .slice(0,4);

  if(rel.length===0) return null;
  return (
    <div className="kb-related">
      <div className="kb-related-title">Похожие статьи</div>
      <div className="kb-related-grid">
        {rel.map(a => (
          <article key={a.slug} className="kb-related-card">
            <Link href={`/knowledge/${a.slug}`} className="kb-related-link">{a.title}</Link>
            <div className="kb-related-meta">{a.category}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
