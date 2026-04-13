'use client'

import Link from 'next/link'
import { useState, useEffect, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useActiveSection } from '@/utils/hooks/use-active-section'
import type { Headings } from '@/utils/hooks/use-headings'

type ContentSidebarProps = {
  headings: Headings[]
  excerpt?: string | null
  title: string
  author: {
    name: string
    bio?: string | null
    avatarUrl?: string | null
    twitter?: string | null
  }
}

export const ContentSidebar = ({ headings, excerpt, title, author }: ContentSidebarProps) => {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const headingIds = useMemo(() => headings.map((h) => h.id), [headings])
  const activeId = useActiveSection(headingIds)

  return (
    <>
      <section className="order-last lg:sticky lg:top-26 lg:self-start lg:order-first border-bluish-gray-600">
        <div className="lg:animate-fade-in lg:p-8 p-4">
          {headings.length > 0 && (
            <div className="hidden lg:block ">
              <h3 className="text-static-secondary text-sm">Table of Contents</h3>
              <ul className="space-y-2  mt-4 text-sm text-static-primary">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={cn('mt-2.5', {
                      'ml-0': heading.level === 1,
                      'ml-4': heading.level === 2,
                      'ml-8': heading.level === 3,
                      'ml-12': heading.level === 4,
                    })}
                  >
                    <Link
                      href={`#${heading.id}`}
                      className={cn(
                        'transition-colors duration-200 hover:text-white/80',
                        activeId === heading.id && 'font-bold text-white',
                      )}
                    >
                      {heading.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="h-px bg-bluish-gray-600" />
      </section>
    </>
  )
}
