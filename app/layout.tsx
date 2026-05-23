import type { Metadata, Viewport } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Crown Flora — Botanical Artistry',
  description: 'Where nature meets artistry. Curated floral compositions for those who seek beauty in simplicity.',
  keywords: ['flowers', 'floral', 'botanical', 'luxury', 'artistry', 'crown flora'],
  authors: [{ name: 'Crown Flora' }],
  openGraph: {
    title: 'Crown Flora — Botanical Artistry',
    description: 'Where nature meets artistry. Curated floral compositions for those who seek beauty in simplicity.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#f7f5f2',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
