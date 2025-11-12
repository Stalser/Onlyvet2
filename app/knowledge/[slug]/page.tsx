// app/knowledge/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }){
  const art = articles.find(a => a.slug === params.slug);
  if(!art) return notFound();

  return (
    <section className="container py-12 sm:py-16">
      <div className="mb-4 text-sm opacity-70">
        <Link href="/knowledge">← Назад к списку статей</Link>
      </div>
      <h1 className="text-3xl font-bold mb-4" style={{fontFamily:'var(--font-montserrat)'}}>{art.title}</h1>
      <article className="prose prose-neutral max-w-none">
        {art.content.split('\n\n').map((p, i) => (<p key={i}>{p}</p>))}
      </article>
      <div className="mt-6">
        <Link href="/booking" className="btn btn-primary">Записаться на консультацию</Link>
      </div>
    </section>
  );
}
