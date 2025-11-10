import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="container grid md:grid-cols-2 gap-10 items-center py-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5" style={{fontFamily: 'var(--font-montserrat)'}}>Мы рядом, даже когда врач далеко.</h1>
          <p className="text-lg opacity-90 mb-8">Онлайн-консультации ветеринара 24/7: быстро, бережно и по принципам доказательной медицины.</p>
          <div className="flex gap-3">
            <Link href="/booking" className="btn btn-primary">Записаться</Link>
            <a href="#advantages" className="btn btn-secondary">Как это работает</a>
          </div>
          <ul className="mt-6 text-sm space-y-1 opacity-80">
            <li>• Ответ от врача — в среднем за 10–15 минут</li>
            <li>• Без стресса для питомца, без дороги</li>
            <li>• Подсказываем, когда нужен офлайн визит</li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-teal/10 rounded-2xl -rotate-1" aria-hidden="true"></div>
          <Image className="relative rounded-2xl" src="/hero.jpg" alt="Ветеринар онлайн" width={800} height={600} />
        </div>
      </div>
    </section>
  );
}
