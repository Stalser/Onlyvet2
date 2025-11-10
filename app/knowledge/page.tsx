export const metadata = { title: 'База знаний — OnlyVet' };
const posts = [
  { title: 'Красные флаги у кошек и собак', excerpt: 'Когда нужно срочно ехать в клинику, а когда поможет онлайн.', href: '/booking' },
  { title: 'Как подготовиться к онлайн-консультации', excerpt: 'Что собрать заранее: вес, симптомы, фото/видео, лекарства.', href: '/booking' },
  { title: 'Топ-ошибки владельцев при лечении', excerpt: 'Почему самолечение опасно и как действовать пошагово.', href: '/booking' },
];
export default function KnowledgePage() {
  return (
    <section className="container py-16">
      <h1 className="text-3xl font-bold mb-6" style={{fontFamily:'var(--font-montserrat)'}}>База знаний</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map(p => (
          <a key={p.title} href={p.href} className="card hover:shadow-lg transition">
            <div className="font-semibold">{p.title}</div>
            <div className="opacity-80 text-sm mt-2">{p.excerpt}</div>
          </a>
        ))}
      </div>
    </section>
  );
}
