'use client';

type Link = { label: string; href: string; sr: string; icon: React.ReactNode };

export default function Socials() {
  const links: Link[] = [
    {
      label: 'Telegram',
      href: 'https://t.me/onlyvet_support',
      sr: 'Открыть Телеграм',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
          <path fill="currentColor" d="M9.8 16.9l-.1 3c.2 0 .4-.1.6-.3l2-1.9 4.1 3c.7.4 1.3.2 1.5-.6l2.7-12c.3-1.2-.4-1.7-1.3-1.4L2.7 9.7c-1.1.4-1.1 1 .2 1.4l4.5 1.4 10.5-6.6-8.1 7.8Z"/>
        </svg>
      ),
    },
    {
      label: 'VK',
      href: 'https://vk.com/onlyvet',
      sr: 'Открыть ВКонтакте',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
          <path fill="currentColor" d="M3 7c.1 5.7 3 10.4 9.4 10.4h.3v-3c2 .2 3.5 1.7 4.1 3H20c-.7-2.3-2.4-3.7-3.5-4.2 1-.6 2.6-2.1 3-6.2h-2.4c-.4 3-2 4.3-2.9 4.6V7h-2.2v5.9c-1-.3-3-1.6-3.1-5.9H5.5z"/>
        </svg>
      ),
    },
    {
      label: 'Одноклассники',
      href: 'https://ok.ru/onlyvet',
      sr: 'Открыть Одноклассники',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
          <path fill="currentColor" d="M12 3.5a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm0 9c2.1 0 4-.6 5.6-1.7.5-.3.6-.9.3-1.4s-.9-.6-1.4-.3A7.7 7.7 0 0112 10a7.7 7.7 0 01-4.5-1.9c-.5-.3-1.1-.2-1.4.3s-.2 1.1.3 1.4A9.5 9.5 0 0012 12.5zm3.3 2.1c-.4-.5-1-.5-1.5-.1-.6.5-1.4.9-1.9 1.1-.5-.2-1.3-.6-1.9-1.1-.5-.4-1.1-.4-1.5.1s-.3 1.1.2 1.5c.7.6 1.6 1 2.2 1.3-.4.4-1 .9-1.6 1.5-.5.5-.5 1.1 0 1.6.4.4 1.1.4 1.6 0 .5-.6 1.1-1.2 1.5-1.6.5.4 1 .9 1.6 1.6.5.4 1.2.4 1.6 0 .4-.5.4-1.1 0-1.6a27 27 0 01-1.6-1.5c.6-.3 1.5-.7 2.2-1.3.5-.4.6-1 .1-1.5z"/>
        </svg>
      ),
    },
    {
      label: 'Instagram*',
      href: 'https://instagram.com/onlyvet',
      sr: 'Открыть Инстаграм',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden width="22" height="22">
          <path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5A4.5 4.5 0 107 12a4.5 4.5 0 005-4.5zm6.3-.8a1.3 1.3 0 10-2.6 0 1.3 1.3 0 002.6 0zM12 9a3 3 0 100 6 3 3 0 000-6z"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--navy)' }}>
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
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--cloud)] text-[var(--navy)]">
              {l.icon}
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
