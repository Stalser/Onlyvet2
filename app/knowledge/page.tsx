// app/knowledge/page.tsx
import Link from 'next/link';
import { articles } from '@/lib/articles';

export const metadata = { title: 'База знаний — OnlyVet' };

export default function KnowledgePage(){
  return (
    <section className="container py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-6" style={{fontFamily:'var(--font-montserrat)'}}>База знаний</h1>
      <div className="grid gap-4">
        {articles.map(a => (
          <article key={a.slug} className="card">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/knowledge/${a.slug}`}>{a.title}</Link>
            </h2>
            <p className="text-sm opacity-80">{a.excerpt}</p>
            <div className="mt-3 flex gap-2">
              <Link href={`/knowledge/${a.slug}`} className="btn bg-white border border-gray-300 rounded-xl px-4">Читать статью</Link>
              <Link href="/booking" className="btn btn-primary">Записаться</Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
