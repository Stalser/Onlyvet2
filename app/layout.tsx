import './globals.css';
import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import StructuredData from '@/components/StructuredData';
import CookieBanner from '@/components/CookieBanner';

const inter = Inter({ subsets: ['latin','cyrillic'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin','cyrillic'], weight: ['400','600','700'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'OnlyVet — Ветеринар онлайн',
  description: 'Мы рядом, даже когда врач далеко. Онлайн-консультации 24/7.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <StructuredData />
        <CookieBanner />
      </body>
    </html>
  );
}
