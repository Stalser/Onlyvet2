'use client';

type Link = { label: string; href: string; sr: string; };

export default function Socials() {
  const links: Link[] = [
    { label: 'Telegram',       href: 'https://t.me/onlyvet_support', sr: 'Открыть Телеграм' },
    { label: 'VK',             href: 'https://vk.com/onlyvet',       sr: 'Открыть ВКонтакте' },
    { label: 'Одноклассники',  href: 'https://ok.ru/onlyvet',        sr: 'Открыть Одноклассники' },
    { label: 'Instagram*',     href: 'https://instagram.com/onlyvet',sr: 'Открыть Инстаграм' },
  ];

  return (
    <section className="container py-16">
      <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--navy)' }}>
        Мы в социальных сетях
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer nofollow"
            aria-label={l.sr}
            className="card flex items-center gap-3 hover:shadow-lg transition"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--cloud)] text-[var(--navy)] text-sm font-semibold">
              {l.label[0]}
            </span>
            <span className="font-semibold">{l.label}</span>
          </a>
        ))}
      </div>

      <p className="mt-4 text-xs opacity-70 leading-relaxed">
        * Instagram является продуктом компании Meta Platforms Inc.<br/>
        Meta Platforms Inc. признана экстремистской организацией и запрещена на территории Российской Федерации.<br/>
        Ссылка приведена исключительно для пользователей, находящихся вне территории РФ.
      </p>
    </section>
  );
}
