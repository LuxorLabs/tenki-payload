'use client'

import Link from 'next/link'
import { ArrowRightIcon } from '@phosphor-icons/react'
import { TENKI_APP_URL } from '@/components/constants/metadata'
import { cn } from '@/lib/utils'

interface ReviewerBannerProps {
  className?: string
}

export const ReviewerBanner = ({ className }: ReviewerBannerProps) => {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-[calc(100%-32px)] xl:max-w-[1080px] 2xl:max-w-[1200px]',
        'flex-col items-start gap-y-1 md:gap-y-0 lg:flex-row lg:items-center lg:justify-center lg:gap-x-3',
        'text-static-primary text-left text-sm lg:text-center',
        'border-bluish-gray-600 border-x px-4 py-2 lg:py-4',
        'bg-[linear-gradient(92deg,_#001429_0%,_#002043_66.14%)]',
        className,
      )}
    >
      Introducing Tenki&apos;s code reviewer: deep, context-aware reviews that actually find bugs.
      <Link
        href={TENKI_APP_URL + '/auth/registration'}
        target="_blank"
        className="group text-cta-link-rest flex items-center gap-1"
      >
        Try it for Free
        <ArrowRightIcon
          size={16}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </div>
  )
}
