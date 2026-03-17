'use client'

import React from 'react'
import Link from 'next/link'
import { HeroBackground } from '@/components/hero-background'

export const Introduction = () => {
  return (
    <section className="relative mx-auto overflow-hidden">
      <HeroBackground />
      <div className="mx-auto mb-0 flex min-h-80 w-full max-w-[1000px] flex-col px-6 pt-20 md:px-12 lg:mb-6 lg:items-start xl:px-0">
        <Link
          href="/"
          className="relative z-20 mt-2 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </section>
  )
}
