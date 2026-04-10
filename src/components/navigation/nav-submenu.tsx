'use client'

import React from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { StatusTag } from '@/components/ui/status-tag'
import { cn } from '@/lib/utils'
import Image from 'next/image'

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
          className={cn('fixed top-auto left-1/2 z-50 -translate-x-1/2')}
        >
          <div
            className={cn(
              'bg-bluish-gray-900 border-bluish-gray-600 mt-6 min-h-[152px] rounded-sm border p-2 shadow-lg',
              'inline-grid justify-items-center gap-2',
              'w-max max-w-[calc(100vw-16px)]',
              submenu.length === 3
                ? 'grid-cols-3'
                : submenu.length <= 2
                  ? 'grid-cols-2'
                  : 'grid-cols-2 xl:grid-cols-4',
            )}
          >
            {submenu.map((sub) => {
              return (
                <Link key={sub.label} href={sub.href}>
                  <div className="group border-bluish-gray-600 bg-bluish-gray-850 flex shrink-0 flex-col items-center justify-center gap-y-1.5 rounded-sm border">
                    <div className="h-[100px] w-[200px] overflow-hidden rounded-md">
                      <Image
                        src={sub.image}
                        alt={sub.label}
                        width={206}
                        height={110}
                        loading="eager"
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    </div>

                    <div className={'border-bluish-gray-600 w-full border-t py-2.5'}>
                      <div className="flex items-center justify-center gap-x-2">
                        <p className={cn('text-static-primary text-sm transition-colors')}>
                          {sub.label}
                        </p>
                        {sub.soon && <StatusTag label="Soon" type="info" />}
                        {sub.new && <StatusTag label="New" type="positive" />}
                      </div>
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
