// app/knowledge/[slug]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles } from '@/lib/articles';
import { useState } from 'react'; // <-- FIX: import useState for client subcomponent
import Lightbox from '@/components/Lightbox';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }));
}

// ... rest of file remains the same; ensure ArticleBody uses useState without TS error
