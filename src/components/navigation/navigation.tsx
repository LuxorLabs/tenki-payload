'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'

import { Logo } from '../logo'
import { DesktopNav } from './desktop-nav'
import { MobileNav } from './mobile-nav'
import { ReviewerBanner } from './reviewer-banner'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { TENKI_APP_URL } from '@/components/constants/metadata'
import { NavigationDivider } from '@/components/dashed-section-divider'
import { useNavigation } from '@/utils/hooks/use-navigation'

export const Navigation = () => {
  const [items] = useNavigation()
  const currentPath = usePathname()
  const { scrollY } = useScroll()

  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  useEffect(() => {
    setActiveSubmenu(null)
  }, [currentPath])

  return (
    <header className="w-full">
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-500 ease-in-out',
          scrolled ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
        )}
      >
        <div className="overflow-hidden">
          <NavigationDivider />
        </div>
      </div>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-in-out',
          scrolled ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]',
        )}
      >
        <div className="overflow-hidden">
          <ReviewerBanner className={cn(isSheetOpen && 'hidden md:flex')} />
        </div>
      </div>
      <div className="flex w-full justify-center">
        <motion.nav
          className={cn(
            'border-bluish-gray-600 fixed inset-x-0 z-[999] mx-auto w-full border transition-all duration-500 ease-in-out',
            'bg-bluish-gray-900 max-w-[calc(100%-32px)] xl:max-w-[1080px] 2xl:max-w-[1200px]',
            scrolled && !isSheetOpen
              ? 'bg-bluish-gray-900/80 mt-0 max-w-full border-t-0 border-b backdrop-blur-md xl:max-w-[1080px] 2xl:max-w-[1200px]'
              : '',
            isSheetOpen && 'border-t-0 md:border-t',
          )}
          onMouseLeave={() => setActiveSubmenu(null)}
        >
          <div
            className={cn(
              'relative mx-auto flex items-center justify-between p-4 transition-colors duration-300 lg:gap-0 lg:px-8 lg:py-4',
              'xl:mt-0 xl:rounded-lg xl:border-0 xl:backdrop-blur-none',
            )}
          >
            <div className="flex items-center justify-between lg:min-w-44">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <Logo className={'w-[90px] md:w-[120px]'} />
              </Link>
            </div>

            <DesktopNav
              items={items}
              currentPath={currentPath}
              activeSubmenu={activeSubmenu}
              onSubmenuChange={setActiveSubmenu}
            />

            <div className="flex items-center gap-0.5 md:gap-2">
              <Link
                className={cn(
                  buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  }),
                )}
                href={TENKI_APP_URL + '/auth/login'}
                target="_blank"
              >
                Login
              </Link>
              <Link
                className={cn(buttonVariants({ size: 'sm' }))}
                href={TENKI_APP_URL + '/auth/registration'}
                target="_blank"
              >
                Sign Up
              </Link>

              <MobileNav
                items={items}
                currentPath={currentPath}
                isSheetOpen={isSheetOpen}
                onSheetOpenChange={setIsSheetOpen}
                contentClassName={scrolled ? '!top-14 md:!top-14' : '!top-18 md:!top-32'}
              />
            </div>
          </div>
        </motion.nav>
      </div>
    </header>
  )
}
