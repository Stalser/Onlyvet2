// components/ArticleHeroRow.tsx
'use client';

import TOC from '@/components/TOC';

type Item = { id: string; text: string; level: 2 | 3 };

export default function ArticleHeroRow({
  cover,
  alt,
  items,
}: {
  cover: string;
  alt?: string;
  items: Item[];
}) {
  return (
    <div className="hero">
      <figure className="figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt={alt || 'cover'} className="img" />
      </figure>

      <nav className="toc">
        <div className="title">Содержание</div>
        <div className="body">
          <TOC items={items} className="list" />
        </div>
      </nav>

      <style jsx>{`
        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 16px;
          align-items: start;
          margin: 8px 0 14px;
        }
        @media (max-width: 899px) {
          .hero { grid-template-columns: 1fr; }
        }
        .figure {
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          overflow: hidden;
          background: #fff;
          max-width: 520px;
        }
        .img {
          display: block;
          width: 100%;
          height: auto;
          aspect-ratio: 8 / 5;
          object-fit: cover;
          max-height: 240px;
        }
        @media (max-width: 899px) { .img { max-height: 170px; } }

        .toc {
          border: 1px solid #e5e7eb;
          background: #fff;
          border-radius: 16px;
          padding: 12px 14px;
          max-height: 240px;   /* не выше фото */
          overflow: hidden;
        }
        .title { font-weight: 700; margin-bottom: 6px; color: #0f172a; }
        .body { height: calc(100% - 26px); overflow: auto; }
        .list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        :global(.lvl3){ padding-left: 12px; }
        :global(.tocLink){ color:#334155; text-decoration:none; }
        :global(.tocLink:hover){ text-decoration:underline; }
        :global(.tocLink.active){ color:#0f172a; font-weight:700; text-decoration:underline; }
      `}</style>
    </div>
  );
}
