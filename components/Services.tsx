// components/Services.tsx
'use client';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { services, groups } from '@/components/servicesData';

const h = React.createElement;

export default function Services() {
  const [tab, setTab] = useState(groups[0].key);
  const filtered = useMemo(() => services.filter(s => s.category === tab), [tab]);
  const total = services.length;
  const countLabel = total > 99 ? '99+' : String(total);

  const header = h(
    'div',
    { className: 'flex items-center justify-between mb-6' },
    h(
      'h2',
      {
        className: 'text-3xl font-bold',
        style: { fontFamily: 'var(--font-montserrat)', color: 'var(--navy)' },
      },
      'Услуги',
    ),
    h(
      Link,
      { href: '/services', className: 'btn bg-white border border-gray-300 rounded-xl px-4' },
      `Все услуги (${countLabel})`,
    ),
  );

  const tabs = h(
    'div',
    { className: 'flex flex-wrap gap-2 mb-6' },
    ...groups.map((g) =>
      h(
        'button',
        {
          key: g.key,
          type: 'button',
          className:
            `px-4 py-2 rounded-xl border text-sm ` +
            (tab === g.key
              ? 'bg-[var(--teal)] text-white border-[var(--teal)]'
              : 'bg-white border-gray-200 hover:bg-[var(--cloud)]'),
          onClick: () => setTab(g.key),
        },
        g.label,
      ),
    ),
  );

  const grid = h(
    'div',
    { className: 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' },
    ...filtered.map((s) =>
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
  );

  return h('section', { className: 'container py-16' }, header, tabs, grid);
}
