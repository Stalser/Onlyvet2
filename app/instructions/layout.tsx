// app/instructions/layout.tsx
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'Инструкции — OnlyVet',
  description: 'Как связаться, зарегистрироваться, оплатить, записаться и подготовиться к онлайн‑консультации.'
};

export default function InstructionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
