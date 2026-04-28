'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { SectionDivider } from '@/components/dashed-section-divider'
import { CALENDLY_URL, TENKI_APP_URL, TENKI_STORAGE_BASE } from '@/components/constants/metadata'

export const PromotionalBanner = () => {
  const pathname = usePathname()

  return (
    <>
      <SectionDivider />
      <div className="border-bluish-gray-600 relative mx-auto min-w-[calc(100%-32px)] max-w-[calc(100%-32px)] overflow-hidden border-x xl:min-w-[1080px] xl:max-w-[1080px] 2xl:min-w-[1200px] 2xl:max-w-[1200px]">
        <img
          src={`${TENKI_STORAGE_BASE}/blue-cube-banner.png`}
          alt="promotional-banner"
          className="absolute inset-0 z-0 h-full w-full object-cover"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col gap-4 py-6 pl-4 lg:py-[60px] lg:pl-8">
          <div className="flex flex-col gap-0.5 lg:gap-3">
            <p className="font-geist-mono text-blue-150 text-xs lg:text-sm">GET TENKI</p>
            <h3 className="text-static-primary max-w-lg text-2xl leading-tight font-semibold lg:text-[30px]">
              Smarter reviews. Faster builds. <br className="hidden md:block" />
              Start for Free in less than 2 min.
            </h3>
          </div>

          <div className="flex flex-col gap-2 md:flex-row md:items-center">
            <Link href={TENKI_APP_URL + '/auth/registration'} target="_blank">
              <Button className={'h-9 min-w-56 lg:w-fit lg:min-w-fit'}>Start for Free</Button>
            </Link>

            <Link
              href={CALENDLY_URL}
              target="_blank"
              className={cn(
                buttonVariants({ variant: 'secondary' }),
                'h-9 max-w-56 cursor-pointer gap-1.5 px-4 py-2 md:max-w-56 lg:w-fit',
              )}
            >
              <span>Talk to an Engineer</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
