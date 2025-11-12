import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'OnlyVet — Ветеринар онлайн',
  description: 'Онлайн‑консультации 24/7',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/icon-192x192.png'
  },
  manifest: '/manifest.json'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
