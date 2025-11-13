// app/services/page.tsx
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { servicesPricing } from '@/lib/pricing';

export const metadata = { title: 'Услуги и цены — OnlyVet' };

export default function ServicesPage(){
  const [sectionFilter, setSectionFilter] = useState<string | 'all'>('all');
  const [query, setQuery] = useState('');

  const sections = useMemo(
    () => Array.from(new Set(servicesPricing.map((s) => s.section))),
    []
  );

  const filtered = useMemo(() => {
    let list = servicesPricing;

    if (sectionFilter !== 'all') {
      list = list.filter((s) => s.section === sectionFilter);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q)
      );
    }

    return list;
  }, [sectionFilter, query]);

  const filteredSections = useMemo(
    () => Array.from(new Set(filtered.map((s) => s.section))),
    [filtered]
  );

  return (
    <section className="container py-12 sm:py-16">
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: 'var(--navy)' }}
      >
        Услуги и цены
      </h1>
      <p className="opacity-80 mb-2 max-w-2xl text-sm sm:text-base">
        OnlyVet — онлайн-ветеринарная клиника. Ниже перечислены основные
        форматы консультаций и сервисов, которые мы предоставляем в удалённом формате.
      </p>
      <p className="opacity-80 mb-6 max-w-2xl text-sm sm:text-base">
        Список и стоимость услуг вы можете гибко обновлять в файле
        <code className="ml-1">lib/pricing.ts</code>. На сайте информация подхватывается автоматически.
      </p>

      {/* Панель фильтров */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 mb-6 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSectionFilter('all')}
            className={`text-xs sm:text-sm px-3 py-1 rounded-full border ${
              sectionFilter === 'all'
                ? 'bg-[var(--teal)] text-white border-[var(--teal)]'
                : 'bg-[var(--cloud)] hover:bg-white'
            }`}
          >
            Все разделы
          </button>
          {sections.map((sec) => (
            <button
              key={sec}
              onClick={() => setSectionFilter(sec)}
              className={`text-xs sm:text-sm px-3 py-1 rounded-full border ${
                sectionFilter === sec
                  ? 'bg-[var(--teal)] text-white border-[var(--teal)]'
                  : 'bg-[var(--cloud)] hover:bg-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
        <div className="w-full sm:w-64">
          <input
            className="input w-full text-sm"
            placeholder="Поиск по названию, коду или описанию…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Список услуг по разделам */}
      <div className="space-y-8">
        {filteredSections.map((sec) => (
          <section key={sec} id={sec}>
            <h2
              className="text-2xl font-semibold mb-3"
              style={{ color: 'var(--navy)' }}
            >
              {sec}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {filtered
                .filter((s) => s.section === sec)
                .map((s) => (
                  <article
                    key={s.code}
                    className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3
                          className="font-semibold text-base sm:text-lg"
                          style={{ color: 'var(--navy)' }}
                        >
                          {s.name}
                        </h3>
                        <span className="text-xs opacity-60">{s.code}</span>
                      </div>
                      <p className="text-sm opacity-80 mb-2">
                        {s.description}
                      </p>
                      <div className="text-sm opacity-70 space-y-1">
                        {s.duration && (
                          <div>
                            <span className="opacity-60">Длительность: </span>
                            {s.duration}
                          </div>
                        )}
                        <div>
                          <span className="opacity-60">Цена: </span>
                          {s.priceRUB !== undefined
                            ? `${s.priceRUB.toLocaleString('ru-RU')} ₽`
                            : 'уточняется'}
                        </div>
                        {s.note && (
                          <div className="opacity-70 text-xs">{s.note}</div>
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Link
                        href={{
                          pathname: '/booking',
                          query: { serviceCode: s.code },
                        }}
                        className="btn btn-primary rounded-xl px-4 text-sm"
                      >
                        Записаться
                      </Link>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}
        {filteredSections.length === 0 && (
          <div className="opacity-70 text-sm">
            По выбранным фильтрам ничего не найдено. Попробуйте изменить запрос
            или раздел.
          </div>
        )}
      </div>
    </section>
  );
}
