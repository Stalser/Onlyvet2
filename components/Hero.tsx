// components/Hero.tsx
'use client';

export default function Hero(){
  return (
    <section className="bg-white">
      <div className="container grid md:grid-cols-2 gap-10 items-center py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-xl bg-teal/10 text-teal px-3 py-1 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-teal inline-block"></span>
            Онлайн — средний ответ 10–15 минут
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{fontFamily:'var(--font-montserrat)'}}>Мы рядом, даже когда врач далеко.</h1>
          <p className="text-lg opacity-90 mb-8">Онлайн‑консультации ветеринара 24/7: быстро, бережно и по принципам доказательной медицины.</p>
          <div className="flex flex-wrap gap-3">
            <a href="/booking" className="btn btn-primary">Записаться</a>
            <a href="#advantages" className="btn btn-secondary">Как это работает</a>
            <a href="/red-flags" className="btn bg-white border border-gray-200 rounded-xl px-5 py-3 hover:bg-cloud">Красные флаги</a>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="rounded-2xl border border-gray-200 p-4"><div className="text-xs opacity-70">Ответ врача</div><div className="text-sm font-semibold mt-1">10–15 мин</div></div>
            <div className="rounded-2xl border border-gray-200 p-4"><div className="text-xs opacity-70">Формат</div><div className="text-sm font-semibold mt-1">Чат / Видео</div></div>
            <div className="rounded-2xl border border-gray-200 p-4"><div className="text-xs  opacity-70">Интеграция</div><div className="text-sm font-semibold mt-1">Vetmanager</div></div>
          </div>
        </div>

        {/* меньше, аккуратнее фото */}
        <div className="relative mx-auto md:mx-0 w-full flex justify-center">
          <div className="rounded-2xl bg-[var(--cloud)] ring-1 ring-black/5 p-3 w-full max-w-[420px] md:max-w-[460px]">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
              <img src="/hero.jpg" alt="Ветеринар онлайн" className="absolute inset-0 w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
