import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
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
          <div className="flex gap-3">
            <Link href="/booking" className="btn btn-primary">Записаться</Link>
            <a href="#advantages" className="btn btn-secondary">Как это работает</a>
            <Link href="/red-flags" className="btn bg-white border border-gray-200 rounded-xl px-5 py-3 hover:bg-cloud">Красные флаги</Link>
          </div>
          <ul className="mt-6 text-sm space-y-1 opacity-80">
            <li>• Без стресса для питомца и дороги</li>
            <li>• Подсказываем, когда нужен офлайн‑осмотр</li>
            <li>• Выписка и план контроля после консультации</li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-teal/10 rounded-2xl -rotate-1" aria-hidden="true"></div>
          <Image className="relative rounded-2xl" src="/hero.jpg" alt="Ветеринар онлайн" width={800} height={600}/>
        </div>
      </div>
    </section>
  );
}
