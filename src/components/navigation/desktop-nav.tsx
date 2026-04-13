'use client'

import Link from 'next/link'
import { CaretDownIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'

import type { NavSubmenuItem } from './nav-submenu'
import { NavSubmenu } from './nav-submenu'
import { cn } from '@/lib/utils'
import { isPathActive } from '@/utils/hooks/use-navigation'

interface NavigationItem {
  label: string
  href?: string
  submenu?: NavSubmenuItem[]
}

interface DesktopNavProps {
  items: NavigationItem[]
  currentPath: string
  activeSubmenu: number | null
  onSubmenuChange: (idx: number | null) => void
}

export const DesktopNav = ({
  items,
  currentPath,
  activeSubmenu,
  onSubmenuChange,
}: DesktopNavProps) => {
  return (
    <ul className="mx-auto hidden divide-x divide-solid divide-white/[4%] rounded-lg lg:flex">
      {items.map((i, idx) => {
        const isActive = isPathActive(currentPath, i.href)
        const showBackground = activeSubmenu === idx
        const isSubMenuOpen = activeSubmenu === idx

        return (
          <li
            key={`nav-desktop-${idx}`}
            onMouseEnter={() => onSubmenuChange(idx)}
            className={cn(
              'text-static-secondary relative inline-block border-0 px-2 py-1 text-sm transition-colors duration-200',
              isActive && 'text-static-primary',
            )}
          >
            <AnimatePresence initial={false}>
              {showBackground && (
                <motion.span
                  layoutId="nav-hover"
                  className="bg-layer-3 absolute inset-0 -z-10 size-full rounded-[4px]"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.4 },
                  }}
                  exit={{
                    opacity: 0,
                  }}
                />
              )}
            </AnimatePresence>
            {i.submenu ? (
              <>
                <div className="relative flex cursor-default items-center gap-0.5">
                  {i.label}
                  <CaretDownIcon size={12} weight="bold" />
                </div>
                <NavSubmenu
                  submenu={i.submenu}
                  isVisible={isSubMenuOpen}
                  onHover={() => onSubmenuChange(idx)}
                />
              </>
            ) : (
              <Link href={i.href!} className="relative" onClick={() => onSubmenuChange(null)}>
                {i.label}
              </Link>
            )}
          </li>
        )
      })}
    </ul>
  )
}
