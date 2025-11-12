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
    excerpt: 'Ситуации, когда не стоит ждать онлайн‑консультации — нужна очная помощь.',
    content: 'Резкая вялость, одышка, частая рвота с вялостью, отсутствие мочеиспускания более 24 часов...\n\nЕсли вы заметили один из этих признаков — это повод для очного осмотра.',
    category: 'Неотложная помощь',
    tags: ['кошки','красные флаги','неотложка'],
    images: [
      { src: '/kb/cat-alert.jpg', alt: 'Кошка вялость', caption: 'Иллюстрация: снижение активности — один из сигналов' }
    ]
  },
  {
    slug: 'pitanie-i-gastro-u-sobak',
    title: 'Питание и ЖКТ у собак: что важно знать',
    excerpt: 'Как подобрать рацион и чего избегать при проблемах ЖКТ у собаки.',
    content: 'Не меняйте рацион резко. Поддерживайте водный баланс.\n\nПри диарее более 24–36 часов лучше обратиться к врачу для оценки.',
    category: 'Питание',
    tags: ['собаки','жкт','рацион'],
    images: [
      { src: '/kb/dog-food-bowl.jpg', alt: 'Миска корма', caption: 'Выбирайте диету по рекомендации специалиста' }
    ]
  }
];

export const categories = Array.from(new Set(articles.map(a => a.category))).sort();
export const allTags = Array.from(new Set(articles.flatMap(a => a.tags))).sort();
