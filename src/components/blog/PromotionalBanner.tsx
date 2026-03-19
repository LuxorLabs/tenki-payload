'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GlobeLines } from '@/assets/svg/globe-lines.svg'
import { GlobeLazy } from '@/components/animation/globe-lazy'

const CALENDLY_URL = 'https://calendly.com/d/cq87-j8n-2yx/tenki-cloud-intro'

export const PromotionalBanner = () => {
  const pathname = usePathname()

  return (
    <>
      <div className="mx-auto mt-20 w-full max-w-[1200px] px-6 md:px-16 lg:px-0">
        <div className="flex flex-col items-center justify-between overflow-hidden rounded-b-md md:rounded-xl xl:h-[304px] xl:flex-row">
        <div className="flex flex-col items-start md:items-center xl:items-start">
          <div className="flex flex-col items-start gap-y-2 md:items-center md:gap-y-3 xl:items-start xl:gap-y-4">
            <div className="flex items-center gap-x-1">
              <div className="hero-bullet mb-0.5 size-3 rounded-sm border border-blue-100" />
              <p className="text-static-primary xl:text-md text-sm">Get Tenki</p>
            </div>
            <h3 className="text-static-primary max-w-sm text-left text-xl font-semibold tracking-[-0.02em] md:text-center md:text-2xl lg:max-w-xl xl:text-left xl:text-4xl">
              Faster Builds. Smarter Reviews. Start Both For Free.
            </h3>
            <p className="text-static-secondary md:text-md max-w-sm text-left text-sm md:text-center xl:max-w-[462px] xl:text-left">
              Change 1 line of YAML for faster runners. Install a GitHub App for AI code reviews. No
              credit card, no contract. Takes about 2 minutes.
            </p>
          </div>

          <div className="mt-4 flex items-center justify-start gap-x-2 md:justify-center xl:mt-6">
            <Link href="https://app.tenki.cloud/auth/registration" target="_blank">
              <Button className="w-full">Start for Free</Button>
            </Link>

            <Link
              href={CALENDLY_URL}
              target="_blank"
              className={cn(buttonVariants({ variant: 'secondary' }), 'cursor-pointer px-4 py-2')}
            >
              <Image
                src="/images/cta-avatar.webp"
                alt="Book demo for Tenki Cloud"
                height={24}
                width={24}
              />
              <span>
                Book A Demo
                <span className="hidden md:inline"> With Marina</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="relative mt-10 w-[300px] md:mt-14 md:w-[558px] xl:mt-0 xl:self-end">
          <div className="relative aspect-[2/1] overflow-hidden rounded-t-full">
            <div className="absolute inset-x-0 top-0 aspect-square w-full scale-100">
              <GlobeLazy className="absolute inset-0 h-full w-full scale-100" key={pathname} />
              <GlobeLines className="absolute inset-0 h-full w-full scale-95" />
            </div>
          </div>

          <div className="blue-gradient absolute top-10 right-10 size-[400px]" />
          <div className="blue-gradient absolute bottom-10 left-10 size-[400px] lg:-top-20" />
        </div>
        </div>
      </div>
      <div className="h-11" />
    </>
  )
}
