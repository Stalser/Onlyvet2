// lib/articles.ts
export type ArticleImage = { src: string; alt?: string; caption?: string };
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  images?: ArticleImage[];
};

export const articles: Article[] = [
  {
    slug: 'krasnye-flagi-u-koshek',
    title: 'Красные флаги у кошек: когда срочно к врачу',
    excerpt: '',
    content: '## Когда ехать в клинику\n\nРезкая вялость, одышка, частая рвота с вялостью, отсутствие мочеиспускания более 24 часов...\n\n### Что делать до визита\n\nСохранить спокойствие, не давать лишних препаратов и связаться с врачом.',
    category: 'Неотложная помощь',
    tags: ['кошки','красные флаги','неотложка'],
    images: [
      { src: '/kb/cat-alert.jpg', alt: 'Снижение активности у кошки', caption: 'Снижение активности — один из красных флагов' }
    ]
  },
  {
    slug: 'pitanie-i-gastro-u-sobak',
    title: 'Питание и ЖКТ у собак: что важно знать',
    excerpt: '',
    content: '## База питания\n\nНе меняйте рацион резко. Поддерживайте водный баланс.\n\n### Когда обращаться к врачу\n\nПри диарее более 24–36 часов лучше обратиться к врачу для оценки.',
    category: 'Питание',
    tags: ['собаки','жкт','рацион'],
    images: [
      { src: '/kb/dog-food-bowl.jpg', alt: 'Миска корма', caption: 'Диету подбирайте со специалистом' }
    ]
  },
  {
    slug: 'dermatologiya-zud-u-pitomtsev',
    title: 'Зуд у питомцев: частые причины и что делать',
    excerpt: '',
    content: '## Частые причины зуда\n\nАллергии, паразиты, контактные дерматиты — от самых частых к редким.\n\n### Первые шаги\n\nИсключить блох, оценить сезонность симптомов, обсудить элиминационную диету.',
    category: 'Дерматология',
    tags: ['кошки','собаки','дерматология','зуд'],
    images: []
  }
];

export const categories = Array.from(new Set(articles.map(a => a.category))).sort();
export const allTags = Array.from(new Set(articles.flatMap(a => a.tags))).sort();
