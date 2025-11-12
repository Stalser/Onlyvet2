// app/knowledge/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';

export const dynamic = 'force-dynamic';

export default function ArticlePage({ params }: { params: { slug: string } }){
  const art = articles.find(a => a.slug === params.slug);
  if(!art) return notFound();

  return (
    <section className="kb-wrap">
      <div className="kb-container">
        {/* Хлебные крошки */}
        <div className="kb-breadcrumbs">
          <Link href="/knowledge">База знаний</Link>
          <span>·</span>
          <span className="muted">{art.category}</span>
        </div>

        {/* Заголовок */}
        <h1 className="kb-title">{art.title}</h1>

        {/* Метаданные */}
        <div className="kb-meta">
          <div className="kb-tags">
            {art.tags?.map(t => <span key={t} className="kb-tag">#{t}</span>)}
          </div>
          <div className="grow" />
          <Link href="/booking" className="kb-cta">Записаться на консультацию</Link>
        </div>

        {/* Обложка/галерея */}
        {art.images?.length ? (
          <figure className="kb-cover">
            {/* ВК‑подобный стиль: широкая обложка с подписью */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={art.images[0].src} alt={art.images[0].alt || 'cover'} className="kb-cover-img" />
            {art.images[0].caption && <figcaption className="kb-caption">{art.images[0].caption}</figcaption>}
          </figure>
        ) : null}

        {/* Текст статьи */}
        <article className="kb-body">
          {art.content.split('\n\n').map((p, i) => (<p key={i}>{p}</p>))}
        </article>

        {/* Низ статьи */}
        <div className="kb-bottom">
          <Link href="/booking" className="kb-cta">Записаться на консультацию</Link>
          <Link href="/knowledge" className="kb-back">К списку статей</Link>
        </div>
      </div>
    </section>
  );
}
