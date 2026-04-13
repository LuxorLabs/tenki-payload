'use client'

import React, { useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { useBackToBlogUrl } from '@/utils/hooks/use-back-to-blog-url'

import { cn } from '@/lib/utils'
import { ArrowLeftIcon } from '@phosphor-icons/react'
import { motion, useMotionValueEvent, useScroll, useSpring } from 'motion/react'

export const BlogStickyHeader = () => {
  const backUrl = useBackToBlogUrl()
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { scrollY, scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  return (
    <div className="border-bluish-gray-600 mx-auto max-w-[calc(100%-32px)] xl:max-w-270 2xl:max-w-300">
      <div
        className={cn(
          'bg-bluish-gray-1000 fixed inset-x-0 top-50 mx-auto max-w-[calc(100%-32px)] transition-[top] duration-500 ease-in-out xl:max-w-270 2xl:max-w-300',
          'border-bluish-gray-600 z-5 border-x backdrop-blur-md',
          scrolled ? 'top-18 lg:top-17' : 'top-43 md:top-37 lg:top-40',
        )}
      >
        <div className="mx-auto flex max-h-11 max-w-[calc(100%-32px)] items-center py-4 lg:px-8 xl:max-w-270 2xl:max-w-300">
          <Link href={backUrl} className="text-static-primary flex items-center gap-x-2 text-sm">
            <ArrowLeftIcon size={16} /> Back to Blog
          </Link>
        </div>
        <div className="bg-bluish-gray-600 relative h-px w-full">
          <motion.div
            className="bg-blue-150 absolute inset-y-0 left-0 h-full w-full origin-left"
            style={{ scaleX }}
          />
        </div>
      </div>
    </div>
  )
}
