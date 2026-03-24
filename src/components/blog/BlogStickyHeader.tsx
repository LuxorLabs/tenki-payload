'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export const BlogStickyHeader = () => {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [navHeight, setNavHeight] = useState(0)
  const progressRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(false)
  const navHeightRef = useRef(0)

  useEffect(() => {
    let raf: number

    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0

      if (progressRef.current) {
        progressRef.current.style.width = `${percent}%`
      }

      const nav = document.querySelector('nav')
      if (nav) {
        const bottom = Math.round(nav.getBoundingClientRect().bottom)
        if (bottom !== navHeightRef.current) {
          navHeightRef.current = bottom
          setNavHeight(bottom)
        }
      }

      const shouldShow = scrollTop > 300
      if (shouldShow !== visibleRef.current) {
        visibleRef.current = shouldShow
        setVisible(shouldShow)
      }

      raf = requestAnimationFrame(update)
    }

    raf = requestAnimationFrame(update)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div
        className="fixed left-0 z-[997] w-full overflow-hidden"
        style={{ top: `${navHeight}px`, height: visible ? '41px' : '0px', transition: 'height 300ms ease' }}
      >
        <div className="border-b border-white/10 bg-[#000A15] backdrop-blur-md">
          <div className="mx-auto flex max-w-[1000px] items-center px-6 py-2.5 md:px-12 xl:px-0">
            <button
              type="button"
              onClick={() => { window.history.length > 1 ? router.back() : router.push('/') }}
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Blog
            </button>
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
