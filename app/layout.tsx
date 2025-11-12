import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'OnlyVet — Ветеринар онлайн',
  description: 'Онлайн‑консультации 24/7',
  icons: {
    icon: '/favicon-v5.ico',
    shortcut: '/favicon-32x32-v5.png',
    apple: '/apple-icon.png'
  },
  manifest: '/manifest.json',
  other: {
    'mask-icon': '/safari-pinned-tab-v5.svg',
    'color-scheme': 'light'
  },
  openGraph: {
    title: 'OnlyVet',
    images: ['/icon-512x512-v5.png']
  },
  twitter: {
    card: 'summary',
    images: ['/icon-192x192-v5.png']
  }
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
