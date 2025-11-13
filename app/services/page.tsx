// app/services/page.tsx
'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { servicesPricing } from '@/lib/pricing';

export default function ServicesPage(){
  const [sectionFilter, setSectionFilter] = useState<string | 'all'>('all');
  const [query, setQuery] = useState('');

  const sections = useMemo(
    () => Array.from(new Set(servicesPricing.map((s) => s.section))),
    []
  );

  const totalCount = servicesPricing.length;

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
      <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
        <h1
          className="text-3xl font-bold"
          style={{ color: 'var(--navy)' }}
        >
          Услуги и цены
        </h1>
        <Link
          href="/docs"
          className="text-sm opacity-80 hover:opacity-100 underline"
        >
          Документы
        </Link>
      </div>

      <p className="opacity-80 mb-2 max-w-2xl text-sm sm:text-base">
        OnlyVet — онлайн-ветеринарная клиника. Ниже представлены основные форматы онлайн-консультаций и сервисов, которые доступны для ваших питомцев.
      </p>
      <p className="opacity-80 mb-6 max-w-2xl text-sm sm:text-base">
        Стоимость услуг зависит от формата, продолжительности и сложности случая. При оформлении заявки администратор уточнит детали и подберёт оптимальное решение.
      </p>

      {/* Верхняя кнопка "Все услуги" и поиск */}
      <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => setSectionFilter('all')}
          className="mx-auto sm:mx-0 inline-flex items-center justify-center px-4 py-1.5 rounded-full border bg-white text-sm font-medium"
        >
          Все услуги ({totalCount})
        </button>
        <div className="w-full sm:w-72">
          <input
            className="input w-full text-sm"
            placeholder="Поиск по названию или описанию…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Чипы категорий (большие разделы) */}
      <div className="rounded-2xl border border-gray-200 bg-white p-3 mb-6 flex flex-wrap gap-2">
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
            <div className="grid md:grid-cols-3 gap-4">
              {filtered
                .filter((s) => s.section === sec)
                .map((s) => (
                  <article
                    key={s.code}
                    className="rounded-2xl border border-gray-200 bg-white p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3
                          className="font-semibold text-base sm:text-lg"
                          style={{ color: 'var(--navy)' }}
                        >
                          {s.name}
                        </h3>
                      </div>
                      <p className="text-sm opacity-80 mb-3">
                        {s.description}
                      </p>
                      <div className="text-sm opacity-80 flex items-center justify-between gap-2">
                        <div>
                          <span className="opacity-60">от </span>
                          {s.priceRUB !== undefined
                            ? `${s.priceRUB.toLocaleString('ru-RU')} ₽`
                            : 'уточняется'}
                        </div>
                        {s.duration && (
                          <div className="text-xs opacity-70">
                            {s.duration}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link
                        href={{
                          pathname: '/booking',
                          query: { serviceCode: s.code },
                        }}
                        className="btn btn-primary rounded-xl px-4 text-sm w-full text-center"
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
            По выбранным фильтрам ничего не найдено. Попробуйте изменить запрос или категорию.
          </div>
        )}
      </div>
    </section>
  );
}
