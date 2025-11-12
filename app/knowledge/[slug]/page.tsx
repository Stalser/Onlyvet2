// app/knowledge/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import ArticleBody from '@/components/ArticleBody';
import ShareBar from '@/components/ShareBar';
import TOC from '@/components/TOC';
import ArticleHeroRow from '@/components/ArticleHeroRow';
import s from './article.v20.module.css';  // можно оставить текущий модуль для body/buttons

export const dynamic = 'force-dynamic';

export async function generateStaticParams(){
  return articles.map(a => ({ slug: a.slug }));
}

type Item = { id:string; text:string; level:2|3 };

function autoCover(images?: {src:string}[]){
  return images && images.length ? images[0].src : '/kb/placeholder-cover.jpg';
}

function parseContent(content:string){
  const parts: {type:'p'|'h2'|'h3',text:string,id?:string}[] = [];
  const items: Item[] = [];
  let idx = 0;
  for(const raw of content.split('\n')){
    const line = raw.trim();
    if(line.startsWith('### ')){ const text=line.replace(/^###\s+/,''); const id='h3-'+(++idx); parts.push({type:'h3',text,id}); items.push({id,text,level:3}); }
    else if(line.startsWith('## ')){ const text=line.replace(/^##\s+/,''); const id='h2-'+(++idx); parts.push({type:'h2',text,id}); items.push({id,text,level:2}); }
    else if(line){ parts.push({type:'p',text:line}); }
  }
  return { parts, items };
}

export default function ArticlePage({ params }:{ params:{slug:string} }){
  const art = articles.find(a => a.slug===params.slug);
  if(!art) return notFound();

  const cover = autoCover(art.images as any);
  const { parts, items } = parseContent(art.content);

  return (
    <section className={s.wrap}>
      <div className={s.container}>
        <div className={s.breadcrumbs}>
          <Link href="/knowledge">← Назад к списку</Link>
        </div>

        <h1 className={s.title}>{art.title}</h1>

        <div className={s.tags}>
          {art.tags?.map(t => <span key={t} className={s.tag}>#{t}</span>)}
        </div>

        {/* ЖЁСТКО: фото слева + TOC справа через клиентский компонент со своими стилями */}
        <ArticleHeroRow cover={cover} alt={art.title} items={items}/>

        {/* Текст — белая карточка */}
        <div className={s.body}>
          <ArticleBody parts={parts as any} images={art.images as any}/>
        </div>

        <ShareBar title={art.title}/>

        <div className={s.bottom}>
          <Link href="/booking" className={s.cta}>Записаться на консультацию</Link>
          <Link href="/knowledge" className={s.back}>К списку</Link>
        </div>
      </div>
    </section>
  );
}
