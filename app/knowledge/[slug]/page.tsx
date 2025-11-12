// app/knowledge/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import ArticleBody from '@/components/ArticleBody';
import ShareBar from '@/components/ShareBar';
import s from './article.module.css';

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
    <section className={s.wrap}>
      <div className={s.container}>
        <div className={s.breadcrumbs}>
          <Link href="/knowledge">База знаний</Link>
          <span>·</span>
          <span className="muted">{art.category}</span>
        </div>

        <h1 className={s.title}>{art.title}</h1>

        <div className={s.tags}>
          {art.tags?.map(t => <span key={t} className={s.tag}>#{t}</span>)}
        </div>

        {/* HERO: фото слева, TOC справа */}
        <div className={s.hero}>
          <figure className={s.figure}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={cover} alt={art.images?.[0]?.alt || 'cover'} className={s.img} />
            {art.images?.[0]?.caption && <figcaption className={s.caption}>{art.images?.[0]?.caption}</figcaption>}
          </figure>

          <nav className={s.tocPanel}>
            <div className={s.tocTitle}>Содержание</div>
            <ul className={s.tocList}>
              {toc.length ? toc.map(i => (
                <li key={i.id} className={i.level===3?s.lvl3:undefined}>
                  <a className={s.tocLink} href={`#${i.id}`}>{i.text}</a>
                </li>
              )) : <li><span className="opacity-60">Нет оглавления</span></li>}
            </ul>
          </nav>
        </div>

        {/* Mobile collapsible TOC */}
        <details className={s.tocCollapsible}>
          <summary>Содержание</summary>
          <div className="toc-body">
            <ul className={s.tocList}>
              {toc.length ? toc.map(i => (
                <li key={i.id} className={i.level===3?s.lvl3:undefined}>
                  <a className={s.tocLink} href={`#${i.id}`}>{i.text}</a>
                </li>
              )) : <li><span className="opacity-60">Нет оглавления</span></li>}
            </ul>
          </div>
        </details>

        {/* Контент */}
        <ArticleBody parts={htmlParts} images={art.images || []} />

        <ShareBar title={art.title} />

        {/* Кнопки справа */}
        <div className={s.bottom}>
          <Link href="/booking" className={s.cta}>Записаться на консультацию</Link>
          <Link href="/knowledge" className={s.back}>К списку статей</Link>
        </div>

        {/* Похожие */}
        <div className={s.related}>
          <div className={s.relatedTitle}>Похожие статьи</div>
          <div className={s.relatedGrid}>
            {articles
              .filter(a => a.slug!==art.slug && (a.category===art.category || a.tags.some(t=>art.tags.includes(t))))
              .slice(0,4)
              .map(a => (
                <article key={a.slug} className={s.relatedCard}>
                  <Link href={`/knowledge/${a.slug}`} className={s.relatedLink}>{a.title}</Link>
                  <div className={s.relatedMeta}>{a.category}</div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
