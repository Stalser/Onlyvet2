import Image from 'next/image';
import Link from 'next/link';
import { doctors } from '@/lib/data';

export default function Doctors() {
  return (
    <section id="doctors" className="container py-16">
      <h2 className="text-3xl font-bold mb-10" style={{fontFamily: 'var(--font-montserrat)'}}>Наши врачи</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((d) => (
          <div key={d.id} className="card">
            <div className="flex items-center gap-4">
              <Image src={d.photo} alt={d.name} width={64} height={64} className="rounded-full" />
              <div>
                <div className="font-semibold">{d.name}</div>
                <div className="text-sm opacity-80">{d.specialty}</div>
                <div className="text-xs opacity-60">Стаж: {d.experience} лет</div>
              </div>
            </div>
            <p className="text-sm opacity-80 mt-4">{d.bio}</p>
            <div className="mt-4 flex gap-3">
              <Link href={`/booking?doctorId=${d.id}`} className="btn btn-primary flex-1">Записаться</Link>
              <a href="#feedback" className="btn btn-secondary">Задать вопрос</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
