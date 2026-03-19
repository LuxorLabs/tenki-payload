import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ReviewerBannerProps {
  hidden?: boolean
}

export const ReviewerBanner = ({ hidden }: ReviewerBannerProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-y-3 md:flex-row md:items-center md:justify-between md:gap-y-0 lg:justify-center lg:gap-x-3',
        'text-static-primary overflow-hidden text-left text-sm lg:text-center',
        'transition-[max-height,opacity,padding] duration-300 ease-in-out',
        'bg-[linear-gradient(92deg,_#001429_0%,_#002043_66.14%)]',
        hidden
          ? 'pointer-events-none max-h-0 py-0 opacity-0'
          : 'pointer-events-auto max-h-[120px] p-6 opacity-100 md:max-h-20 md:px-9 md:py-5 lg:p-5',
      )}
    >
      Introducing Tenki&#39;s code reviewer: deep,{' '}
      <br className="hidden md:block lg:hidden" /> context-aware reviews that actually find bugs.
      <Link
        href="https://app.tenki.cloud/auth/registration"
        target="_blank"
        className="group text-cta-link-rest flex items-center gap-1"
      >
        Try it for Free
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 256 256"
          fill="currentColor"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
        </svg>
      </Link>
    </div>
  )
}
