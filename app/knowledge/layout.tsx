// app/knowledge/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'База знаний — OnlyVet',
  description: 'Статьи для владельцев — красные флаги, питание, дерматология и т.д.'
};

export default function KnowledgeLayout({ children }: { children: React.ReactNode }){
  return children;
}
