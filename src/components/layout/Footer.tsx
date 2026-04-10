'use client'

import React from 'react'
import Link from 'next/link'
import { FooterBackground } from '@/components/footer-background'
import { Logo } from '@/components/logo'
import { ProductHuntTag } from '@/components/product-hunt-tag'
import { UneedCarousel } from '@/components/uneed-carousel'
import { cn } from '@/lib/utils'
import { PromotionalBanner } from '@/components/blog/PromotionalBanner'
import {
  BUILT_IN_SEATTLE_URL,
  CALENDLY_URL,
  TENKI_DISCORD_URL,
  TENKI_LINKED_IN_URL,
  TENKI_UNEED_TOOL_URL,
  TENKI_WEB_BASE,
  TENKI_X_URL,
} from '@/components/constants/metadata'
import { SectionDivider } from '@/components/dashed-section-divider'
import { UneedDailyBadge } from '@/assets/svg/uneed-daily-badge.svg'

const FOOTER_LINK_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Home', href: `${TENKI_WEB_BASE}` },
      { label: 'Code Reviewer', href: `${TENKI_WEB_BASE}/features/code-reviewer` },
      { label: 'Runners', href: `${TENKI_WEB_BASE}/features/runners` },
      { label: 'Agent Sandbox', href: `${TENKI_WEB_BASE}/features/sandbox` },
      { label: 'Pricing', href: `${TENKI_WEB_BASE}/pricing` },
      { label: 'Documentation', href: `${TENKI_WEB_BASE}/docs`, external: true },
      { label: 'Changelog', href: `${TENKI_WEB_BASE}/docs/changelog`, external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: `${TENKI_WEB_BASE}/company/about` },
      { label: 'Careers', href: `${TENKI_WEB_BASE}/company/careers`, external: true },
      { label: 'Security', href: `${TENKI_WEB_BASE}/company/security` },
      {
        label: 'Privacy Policy',
        href: `${TENKI_WEB_BASE}/docs/privacy-policy`,
        external: true,
      },
      {
        label: 'Terms of Use',
        href: `${TENKI_WEB_BASE}/docs/terms-of-service`,
        external: true,
      },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'X (Twitter)', href: TENKI_X_URL },
      { label: 'LinkedIn', href: TENKI_LINKED_IN_URL },
      { label: 'Discord', href: TENKI_DISCORD_URL },
      { label: 'Book Demo', href: CALENDLY_URL, external: true },
    ],
  },
]

function FooterLinks() {
  return (
    <div className="my-6 grid grid-cols-2 gap-6 md:mt-6 md:grid-cols-3 md:gap-16">
      {FOOTER_LINK_COLUMNS.map((column) => (
        <ul
          key={column.title}
          className="text-static-primary [&_a:hover]:text-static-secondary space-y-3 text-sm [&_a]:transition-colors [&_a]:duration-300"
        >
          <li className="text-static-secondary text-xs">{column.title}</li>
          {column.links.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      <PromotionalBanner />
      <SectionDivider />
      <footer className="bg-bluish-gray-1000 relative w-full overflow-hidden">
        <div className="border-bluish-gray-600 relative mx-auto flex max-w-[calc(100%-32px)] flex-col border-x xl:max-w-[1080px] 2xl:max-w-[1200px]">
          <div className="flex max-h-[590px] flex-col px-4 md:h-[276px] md:flex-row md:justify-between lg:min-h-[400px] lg:px-8">
            <div className="mt-6 flex flex-col gap-4 md:max-w-[228px] lg:mt-8 lg:max-w-[250px] lg:gap-8">
              <div className="flex flex-col gap-2">
                <Link href="/" aria-label="home" className="flex items-center space-x-2">
                  <Logo className={'w-24'} />
                </Link>
                <p className="text-static-secondary text-sm">
                  Say hi at{' '}
                  <Link
                    href="mailto:hello@tenki.cloud"
                    className="text-cta-link-rest hover:text-cta-link-hovered transition-colors duration-300 hover:underline"
                  >
                    hello@tenki.cloud
                  </Link>{' '}
                  👋
                </p>
              </div>

              <div className="flex flex-row md:flex-col lg:gap-y-2">
                <ProductHuntTag theme="dark" />
                <div className={'hidden lg:block'}>
                  <UneedCarousel />
                </div>
                <div className={'flex lg:hidden'}>
                  <Link href={TENKI_UNEED_TOOL_URL} target="_blank" rel="noopener noreferrer">
                    <UneedDailyBadge className="h-8 w-40 md:h-[42px]" />
                  </Link>
                </div>
              </div>
            </div>
            <FooterLinks />
          </div>

          <div className="text-static-secondary bg-bluish-gray-900 diagonal-stripes border-bluish-gray-600 flex flex-col gap-y-2 border-t p-4 md:flex-row md:items-center md:justify-end lg:p-8">
            <div className="text-sm md:text-xs lg:text-sm">
              © {currentYear} Tenki LLC.{' '}
              <Link
                href={BUILT_IN_SEATTLE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cta-link-rest hover:text-cta-link-rest/80 transition-colors duration-300 ease-out hover:underline"
              >
                Built in Seattle, WA.
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
