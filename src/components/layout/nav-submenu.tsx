'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { StatusTag } from '@/components/ui/status-tag'

const TENKI_WEB_BASE = 'https://tenki.cloud'

export interface NavSubmenuItem {
  label: string
  href: string
  image: string
  icon?: React.ReactNode
  soon?: boolean
  new?: boolean
}

interface NavSubmenuProps {
  submenu: NavSubmenuItem[]
  isVisible: boolean
  onHover?: () => void
  onLeave?: () => void
}

export const NavSubmenu = ({ submenu, isVisible, onHover, onLeave }: NavSubmenuProps) => {
  const toTenkiUrl = (href: string) => (href.startsWith('http') ? href : `${TENKI_WEB_BASE}${href}`)

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, scale: 1, y: 8, pointerEvents: 'none' }}
          animate={{ opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' }}
          exit={{ opacity: 0, scale: 1, y: 8, pointerEvents: 'none' }}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          transition={{ type: 'spring', stiffness: 120, damping: 12 }}
          className={cn('absolute top-[calc(100%)] left-1/2 z-50 -translate-x-1/2')}
        >
          <div
            className={cn(
              'bg-brand-1000 border-brand-600/8 mt-6 min-h-[152px] rounded-[10px] border p-2 shadow-lg',
              'inline-grid w-max max-w-[calc(100vw-16px)] grid-cols-2 justify-items-center gap-2 lg:grid-cols-2 xl:grid-cols-4',
            )}
          >
            {submenu.map((sub) => {
              return (
                <Link key={sub.label} href={toTenkiUrl(sub.href)}>
                  <div className="group flex shrink-0 flex-col items-center justify-center gap-y-1.5">
                    <div className="h-[100px] w-[200px] overflow-hidden rounded-md">
                      <Image
                        src={sub.image}
                        alt={sub.label}
                        width={200}
                        height={100}
                        loading="lazy"
                        sizes="200px"
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>

                    <div className="flex items-center gap-x-2">
                      <p className={cn('text-static-primary text-sm transition-colors')}>{sub.label}</p>
                      {sub.soon && <StatusTag label="Soon" type="info" />}
                      {sub.new && <StatusTag label="New" type="positive" />}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
