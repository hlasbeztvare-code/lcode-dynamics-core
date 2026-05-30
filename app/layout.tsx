import type { Metadata } from 'next';
import { Inter, Bebas_Neue } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'L‑Code Dynamics — Premium Software Development',
  description: 'We engineer software that moves at the speed of your ambition. Custom solutions, scalable architecture, relentless execution.',
  openGraph: {
    title: 'L‑Code Dynamics',
    description: 'Premium IT & Software Development Studio',
    type: 'website',
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body>{children}</body>
    </html>
  );
}
