// app/services/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { services, groups } from '@/components/servicesData';

const h = React.createElement;

export default function ServicesPage() {
  const head = h(
    'h1',
    {
      className: 'text-3xl font-bold mb-6',
      style: { fontFamily: 'var(--font-montserrat)', color: 'var(--navy)' },
    },
    'Все услуги',
  );

  const sections = groups.map((g) =>
    h(
      'div',
      { key: g.key, className: 'mb-10' },
      h(
        'h2',
        { className: 'text-xl font-semibold mb-4', style: { color: 'var(--navy)' } },
        g.label,
      ),
      h(
        'div',
        { className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' },
        ...services
          .filter((s) => s.category === g.key)
          .map((s) =>
            h(
              'article',
              { key: s.slug, className: 'card flex flex-col' },
              h(
                'div',
                { className: 'flex items-center gap-3 mb-2' },
                h(
                  'div',
                  { className: 'w-10 h-10 rounded-full bg-[var(--cloud)] flex items-center justify-center text-lg' },
                  s.emoji ?? '🐾',
                ),
                h(
                  'div',
                  { className: 'font-semibold', style: { color: 'var(--navy)' } },
                  s.name,
                ),
              ),
              h('p', { className: 'text-sm opacity-90 flex-1' }, s.desc ?? ''),
              h(
                'div',
                { className: 'mt-3 flex items-center justify-between' },
                h('div', { className: 'text-sm font-semibold' }, s.price ?? ''),
                s.duration ? h('div', { className: 'text-xs opacity-70' }, s.duration) : null,
              ),
              h(
                'div',
                { className: 'mt-4' },
                h(
                  Link,
                  { href: `/booking?service=${s.slug}`, className: 'btn btn-secondary' },
                  'Записаться',
                ),
              ),
            ),
          ),
      ),
    ),
  );

  return h('section', { className: 'container py-16' }, head, ...sections);
}
