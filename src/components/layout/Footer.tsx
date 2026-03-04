'use client'

import React from 'react'
import Link from 'next/link'
import { FooterBackground } from '@/components/footer-background'
import { Logo } from '@/components/logo'
import { ProductHuntTag } from '@/components/product-hunt-tag'
import { UneedCarousel } from '@/components/uneed-carousel'
import { cn } from '@/lib/utils'

const TENKI_WEB_BASE = 'https://tenki.cloud'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const toTenkiUrl = (href: string) => (href.startsWith('http') || href.startsWith('mailto:') ? href : `${TENKI_WEB_BASE}${href}`)

  return (
    <section className="relative w-full">
      <footer
        className={cn(
          'relative mx-auto w-full max-w-[1200px] overflow-hidden',
          'bg-[#000A15] backdrop-blur-xs backdrop-filter',
        )}
      >
        <FooterBackground />
        <div className="relative mx-auto flex h-full w-full max-w-[1200px] flex-col gap-12 md:items-center md:justify-center">
          <div className="z-50 flex flex-col gap-8 px-6 pt-8 md:mx-auto md:w-full md:flex-row md:justify-between md:px-16 lg:px-6 xl:px-0">
            <div className="flex flex-col border-t border-white/20 md:w-full md:flex-row md:justify-between">
              <div className="mt-6 flex flex-col gap-12 md:max-w-[228px] lg:max-w-[250px]">
                <div className="flex flex-col gap-2">
                  <Link href={TENKI_WEB_BASE} aria-label="home" className="flex items-center space-x-2">
                    <Logo className="w-24" />
                  </Link>
                  <p className="text-static-secondary text-sm">
                    Say hi at{' '}
                    <Link
                      href="mailto:hello@tenki.cloud"
                      className="text-cta-link-rest hover:text-cta-link-hovered transition-colors duration-300"
                    >
                      hello@tenki.cloud
                    </Link>{' '}
                    👋
                  </p>
                </div>

                <div className="flex flex-col gap-y-2">
                  <ProductHuntTag theme="dark" />
                  <UneedCarousel />
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-3 lg:gap-16">
                <ul className="text-static-primary order-1 space-y-3 text-sm">
                  <li className="text-static-secondary">Product</li>
                  <li>
                    <Link href={toTenkiUrl('/')}>Home</Link>
                  </li>
                  <li>
                    <Link href={toTenkiUrl('/features/linux')}>Linux Runners</Link>
                  </li>
                  <li>
                    <Link href={toTenkiUrl('/pricing')}>Pricing</Link>
                  </li>
                  <li>
                    <Link href={toTenkiUrl('/docs')} target="_blank">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href={toTenkiUrl('/docs/changelog')} target="_blank">
                      Changelog
                    </Link>
                  </li>
                </ul>

                <ul className="text-static-primary order-2 space-y-3 text-sm">
                  <li className="text-static-secondary">Company</li>
                  <li>
                    <Link href={toTenkiUrl('/company/blog')}>Blog</Link>
                  </li>
                  <li>
                    <Link href={toTenkiUrl('/company/about')}>About</Link>
                  </li>
                  <li>
                    <Link href={toTenkiUrl('/company/careers')} target="_blank">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href={toTenkiUrl('/company/security')}>Security</Link>
                  </li>
                  <li>
                    <Link href="https://tenki.cloud/docs/privacy-policy" target="_blank">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="https://tenki.cloud/docs/terms-of-service" target="_blank">
                      Terms of Use
                    </Link>
                  </li>
                </ul>

                <ul className="text-static-primary order-3 space-y-3 text-sm">
                  <li className="text-static-secondary">Connect</li>
                  <li>
                    <Link href="https://x.com/tenkicloud">X (Twitter)</Link>
                  </li>
                  <li>
                    <Link href="https://www.linkedin.com/company/tenki-cloud/about">LinkedIn</Link>
                  </li>
                  <li>
                    <Link href="https://discord.gg/qNFaWrR6um">Discord</Link>
                  </li>
                  <li>
                    <Link href="https://calendly.com/d/cq87-j8n-2yx/tenki-cloud-intro" target="_blank">
                      Book Demo
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full max-w-[1200px] px-6 md:px-16 lg:px-6 xl:px-0">
            <div className="text-static-secondary flex flex-col gap-y-2 border-t border-white/20 py-6 md:flex-row md:items-center md:justify-between">
              <div className="px-0 text-sm md:text-xs lg:text-sm" />
              <div className="px-0 text-sm md:text-xs lg:text-sm">
                © {currentYear} Tenki LLC.{' '}
                <Link
                  href="https://www.builtinseattle.com/company/tenki-cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cta-link-rest hover:text-cta-link-rest/80 transition-colors duration-300 ease-out"
                >
                  Built in Seattle, WA.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  )
}
