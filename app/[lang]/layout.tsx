import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import dynamic from 'next/dynamic'
import '../globals.css'

const BackgroundMatrix = dynamic(() => import('@/components/BackgroundMatrix'))
const BackgroundCircuits = dynamic(() => import('@/components/BackgroundCircuits'))

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
})

const outfit = Outfit({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'L-Code Dynamics | Luxury Headless E-Commerce Studio',
  description: 'Prémiové headless e-commerce řešení s nulovou tolerancí chyb. Rychlost odezvy pod 200 ms, špičkový design, stabilní architektura.',
  keywords: ['headless', 'e-commerce', 'Shoptet API', 'Shopify', 'Next.js', 'Framer Motion', 'L-Code Dynamics', 'luxusní web design'],
  authors: [{ name: 'L-Code Dynamics' }],
  robots: 'index, follow',
}

import SmoothScroll from '@/components/SmoothScroll'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  return (
    <html lang={lang || 'cs'} className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans bg-white antialiased text-black select-none selection:bg-brand-red/20 selection:text-brand-red">
        <SmoothScroll>
          <BackgroundMatrix />
          <BackgroundCircuits />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}

