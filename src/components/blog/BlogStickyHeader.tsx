'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useBackToBlogUrl } from '@/utils/hooks/use-back-to-blog-url'

export const BlogStickyHeader = () => {
  const backUrl = useBackToBlogUrl()
  const [visible, setVisible] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0

    if (progressRef.current) {
      progressRef.current.style.width = `${percent}%`
    }

    const nav = document.querySelector('nav')
    if (nav) {
      const bottom = Math.round(nav.getBoundingClientRect().bottom)
      setNavHeight((prev) => (prev !== bottom ? bottom : prev))
    }

    setVisible(scrollTop > 300)
  }, [])

  useEffect(() => {
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <>
      <div
        className="fixed left-0 z-[997] w-full overflow-hidden"
        style={{ top: `${navHeight}px`, height: visible ? '41px' : '0px', transition: 'height 300ms ease' }}
      >
        <div className="border-b border-white/10 bg-[#000A15] backdrop-blur-md">
          <div className="mx-auto flex max-w-[1000px] items-center px-6 py-2.5 md:px-12 xl:px-0">
            <Link
              href={backUrl}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 z-[998] h-1 w-full bg-white/5">
        <div
          ref={progressRef}
          className="h-full bg-blue-500"
          style={{ width: '0%' }}
        />
      </div>
    </>
  )
}
