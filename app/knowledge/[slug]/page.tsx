// app/knowledge/[slug]/page.tsx
'use client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import ImageUploader from '@/components/ImageUploader';

export default function ArticlePage({ params }: { params: { slug: string } }){
  const art = articles.find(a => a.slug === params.slug);
  if(!art) return notFound();

  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-4 text-sm opacity-70">
        <Link href="/knowledge">← Назад к списку статей</Link>
      </div>
      <h1 className="text-3xl font-bold mb-4" style={{fontFamily:'var(--font-montserrat)'}}>{art.title}</h1>

      {/* Галерея */}
      {art.images && art.images.length>0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {art.images.map((img, i) => (
            <figure key={i} className="rounded-xl overflow-hidden border bg-white">
              <img src={img.src} alt={img.alt || ('img-'+i)} className="w-full h-48 object-cover" loading="lazy"/>
              {img.caption && <figcaption className="text-xs opacity-70 p-2">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      <article className="prose prose-neutral max-w-none">
        {art.content.split('\n\n').map((p, i) => (<p key={i}>{p}</p>))}
      </article>

      <div className="mt-6 flex gap-3">
        <Link href="/booking" className="btn btn-primary">Записаться на консультацию</Link>
        <Link href="/knowledge" className="btn bg-white border border-gray-300 rounded-xl px-4">К списку</Link>
      </div>

      {/* Локальный предпросмотр загрузки изображений */}
      <div className="mt-8">
        <ImageUploader />
      </div>
    </section>
  );
}
