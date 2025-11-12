// app/knowledge/page.tsx
'use client';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { articles, categories, allTags } from '@/lib/articles';

export const metadata = { title: 'База знаний — OnlyVet' };

function useUrlState() {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();

  const [q, setQ] = useState(search.get('q') || '');
  const [cat, setCat] = useState(search.get('cat') || '');
  const [tag, setTag] = useState(search.get('tag') || '');

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (cat) params.set('cat', cat);
      if (tag) params.set('tag', tag);
      const qstr = params.toString();
      router.replace(qstr ? `${pathname}?${qstr}` : pathname);
    }, 250);
    return () => clearTimeout(t);
  }, [q, cat, tag, pathname, router]);

  useEffect(() => {
    const urlQ = search.get('q') || '';
    const urlCat = search.get('cat') || '';
    const urlTag = search.get('tag') || '';
    if (urlQ !== q) setQ(urlQ);
    if (urlCat !== cat) setCat(urlCat);
    if (urlTag !== tag) setTag(urlTag);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const clear = () => { setQ(''); setCat(''); setTag(''); };
  return { q, setQ, cat, setCat, tag, setTag, clear };
}

export default function KnowledgePage(){
  const { q, setQ, cat, setCat, tag, setTag, clear } = useUrlState();

  const list = useMemo(()=>{
    const qn = q.trim().toLowerCase();
    return articles.filter(a => {
      const byQ = !qn || a.title.toLowerCase().includes(qn) || a.excerpt.toLowerCase().includes(qn) || a.content.toLowerCase().includes(qn);
      const byCat = !cat || a.category === cat;
      const byTag = !tag || a.tags.includes(tag);
      return byQ && byCat && byTag;
    });
  }, [q, cat, tag]);

  return (
    <section className="container py-12 sm:py-16">
      <h1 className="text-3xl font-bold mb-6" style={{fontFamily:'var(--font-montserrat)'}}>База знаний</h1>

      {/* Фильтры */}
      <div className="card mb-6">
        <div className="grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <label className="label">Поиск по ключевым словам</label>
            <input className="input" placeholder="поиск (запрос, диагноз, симптом)"
              value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <div>
            <label className="label">Категория</label>
            <select className="select" value={cat} onChange={e=>setCat(e.target.value)}>
              <option value="">Все категории</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Тег</label>
            <select className="select" value={tag} onChange={e=>setTag(e.target.value)}>
              <option value="">Все теги</option>
              {allTags.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 text-sm opacity-80">
          <span>Найдено: <b>{list.length}</b></span>
          {(q || cat || tag) && <button className="btn bg-white border border-gray-300 rounded-xl px-3" onClick={clear}>Сбросить фильтры</button>}
        </div>
      </div>

      {/* Список статей */}
      <div className="grid gap-4">
        {list.map(a => (
          <article key={a.slug} className="card">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold"><Link href={`/knowledge/${a.slug}`}>{a.title}</Link></h2>
              <span className="text-xs opacity-70">{a.category}</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-2 text-xs opacity-70">
              {a.tags.map(t => <span key={t} className="px-2 py-1 rounded-full border">{t}</span>)}
            </div>
            <p className="text-sm opacity-80 mt-2">{a.excerpt}</p>
            <div className="mt-3 flex gap-2">
              <Link href={`/knowledge/${a.slug}`} className="btn bg-white border border-gray-300 rounded-xl px-4">Читать статью</Link>
            </div>
          </article>
        ))}
        {list.length===0 && (
          <div className="text-sm opacity-70">Ничего не найдено. Измените параметры фильтра.</div>
        )}
      </div>
    </section>
  );
}
