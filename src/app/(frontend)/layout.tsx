import React from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { cn } from '@/lib/utils'
import { ReactLenis } from '../lenis'
import { Footer } from '@/components/layout/Footer'

import type { Metadata, Viewport } from 'next'
import { Navigation } from '@/components/navigation/navigation'

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
  fallback: ['system-ui', 'arial'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

const OG_IMAGE = 'https://storage.googleapis.com/tenki-cloud-assets/web/tenki-open-graph.webp'

export const metadata: Metadata = {
  metadataBase: new URL('https://tenki.cloud/blog'),
  title: {
    default: 'Tenki Blog',
    template: '%s | Tenki Blog',
  },
  description: 'Product updates, guides, tutorials, and tips from the Tenki team.',
  keywords: ['Tenki', 'GitHub Actions Runners', 'CI/CD', 'DevOps', 'blog'],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'Tenki Blog',
    description: 'Product updates, guides, tutorials, and tips from the Tenki team.',
    url: 'https://tenki.cloud/blog',
    type: 'website',
    siteName: 'Tenki',
    locale: 'en_US',
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    title: 'Tenki Blog',
    description: 'Product updates, guides, tutorials, and tips from the Tenki team.',
    card: 'summary_large_image',
    images: [{ url: OG_IMAGE }],
  },
  icons: {
    icon: '/blog/images/favicon-default.png',
    apple: '/blog/images/favicon-default.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000A15',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={cn(geist.className, geistMono.variable, 'scroll-smooth')}>
      <ReactLenis root options={{ duration: 0.6 }}>
        <body className="flex min-h-screen flex-col scroll-smooth bg-[#000A15]">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Tenki',
                url: 'https://tenki.cloud',
                logo: OG_IMAGE,
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer support',
                  email: 'hello@tenki.cloud',
                },
                sameAs: ['https://x.com/TenkiCloud'],
              }),
            }}
          />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </body>
      </ReactLenis>
    </html>
  )
}
