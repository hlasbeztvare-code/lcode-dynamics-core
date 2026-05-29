import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import '../globals.css'
import BackgroundMatrix from '@/components/BackgroundMatrix'
import BackgroundCircuits from '@/components/BackgroundCircuits'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
})

export const metadata: Metadata = {
  title: 'L-Code Dynamics | Luxury Headless E-Commerce Studio',
  description: 'Prémiové headless e-commerce řešení s nulovou tolerancí chyb. Rychlost odezvy pod 200 ms, špičkový design, stabilní architektura.',
  keywords: ['headless', 'e-commerce', 'Shoptet API', 'Shopify', 'Next.js', 'Framer Motion', 'L-Code Dynamics', 'luxusní web design'],
  authors: [{ name: 'L-Code Dynamics' }],
  robots: 'index, follow',
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  return (
    <html lang={params.lang || 'cs'} className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="font-sans bg-white antialiased text-black select-none selection:bg-brand-red/20 selection:text-brand-red">
        <BackgroundMatrix />
        <BackgroundCircuits />
        {children}
      </body>
    </html>
  )
}

