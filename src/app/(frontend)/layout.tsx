import React from 'react'
import { Geist } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'
import { ReactLenis } from '../lenis'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
  fallback: ['system-ui', 'arial'],
})

export const metadata = {
  description: 'Tenki Blog',
  title: 'Tenki Blog',
  icons: [{ url: '/images/favicon-default.png' }],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={cn(geist.className, 'scroll-smooth')}>
      <ReactLenis root options={{ duration: 0.6 }}>
        <body className="flex min-h-screen flex-col scroll-smooth bg-[#000A15]">
          <Navigation />
          <main>{children}</main>
          <Footer />
        </body>
      </ReactLenis>
    </html>
  )
}
