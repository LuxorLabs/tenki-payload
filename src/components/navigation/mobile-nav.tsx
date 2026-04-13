'use client'

import React, { useCallback, useState } from 'react'
import Link from 'next/link'
import { CaretDownIcon, ListIcon, XIcon } from '@phosphor-icons/react'

import type { NavSubmenuItem } from './nav-submenu'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { isPathActive } from '@/utils/hooks/use-navigation'
import { StatusTag } from '@/components/ui/status-tag'

interface NavigationItem {
  label: string
  href?: string
  submenu?: NavSubmenuItem[]
}

interface MobileNavProps {
  items: NavigationItem[]
  currentPath: string
  isSheetOpen: boolean
  onSheetOpenChange: (open: boolean) => void
  contentClassName?: string
}

export const MobileNav = ({
  items,
  currentPath,
  isSheetOpen,
  onSheetOpenChange,
  contentClassName,
}: MobileNavProps) => {
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<number[]>([])

  const toggleMobileSubmenu = useCallback((idx: number) => {
    setOpenMobileSubmenus((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    )
  }, [])

  return (
    <Sheet open={isSheetOpen} onOpenChange={onSheetOpenChange} modal={false}>
      <SheetTrigger asChild>
        <Button
          aria-label={isSheetOpen ? 'Close Menu' : 'Open Menu'}
          variant="ghost"
          className="pointer-events-auto relative flex size-10 items-center justify-center lg:hidden"
        >
          <ListIcon
            className={cn(
              'absolute transition-opacity duration-200 lg:hidden',
              isSheetOpen && 'pointer-events-none rotate-180 opacity-0',
            )}
          />
          <XIcon
            className={cn(
              'absolute transition-opacity duration-200 lg:hidden',
              !isSheetOpen && 'pointer-events-none rotate-180 opacity-0',
            )}
          />
        </Button>
      </SheetTrigger>
      <SheetContent
        data-lenis-prevent
        className={cn(
          '!w-full !max-w-full !p-4',
          'custom-scrollbar flex touch-pan-y flex-col gap-y-0 overflow-y-auto overscroll-contain',
          'bg-bluish-gray-1000 right-0 left-0 h-full border-0 xl:hidden',
          contentClassName,
        )}
        side="left"
        overlayClassName="bg-transparent"
      >
        <SheetHeader className="hidden">
          <SheetTitle />
        </SheetHeader>
        <ul className="bg-bluish-gray-900 border-bluish-gray-600 divide-y divide-solid divide-white/[8%] border-x border-b border-white/[8%]">
          {items.map((i, idx) => {
            const hasSubmenu = !!i.submenu
            const isOpen = openMobileSubmenus.includes(idx)
            return (
              <React.Fragment key={idx}>
                {hasSubmenu ? (
                  <li
                    className={cn(
                      'text-static-secondary flex cursor-pointer items-center justify-between p-4 text-sm',
                      i.href && currentPath.includes(i.href) && 'text-static-primary font-bold',
                    )}
                    onClick={() => toggleMobileSubmenu(idx)}
                  >
                    <span>{i.label}</span>
                    <CaretDownIcon
                      size={16}
                      className={cn('transition-transform', isOpen && 'rotate-180')}
                    />
                  </li>
                ) : (
                  <li>
                    <Link
                      href={i.href!}
                      onClick={() => onSheetOpenChange(false)}
                      className={cn(
                        'text-static-secondary flex justify-between p-4 text-sm',
                        currentPath === i.href && 'text-static-primary font-bold',
                      )}
                    >
                      {i.label}
                    </Link>
                  </li>
                )}
                {hasSubmenu &&
                  isOpen &&
                  i.submenu?.map((sub, sIdx) => {
                    const isActive = isPathActive(currentPath, sub.href)
                    return (
                      <li key={sIdx}>
                        <Link
                          href={sub.href}
                          onClick={() => onSheetOpenChange(false)}
                          className={cn(
                            'flex items-center gap-2 px-4 py-4 text-sm transition-colors',
                            isActive ? 'text-static-primary' : 'text-static-secondary',
                          )}
                        >
                          {sub.icon}
                          {sub.label}
                          {sub.new && <StatusTag label="New" type="positive" />}
                          {sub.soon && <StatusTag label="Soon" type="info" />}
                        </Link>
                      </li>
                    )
                  })}
              </React.Fragment>
            )
          })}
        </ul>

        <div className="relative -mx-4 flex-1">
          <div className="border-bluish-gray-600 pointer-events-none absolute top-0 left-0 w-4 border-t border-dashed" />
          <div className="border-bluish-gray-600 pointer-events-none absolute top-0 right-0 w-4 border-t border-dashed" />
          <div className="border-bluish-gray-600 mx-4 h-full border-x border-dashed" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
