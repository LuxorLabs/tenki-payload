'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArchiveIcon, BriefcaseIcon, BuildingsIcon, CaretDownIcon, ChartBarIcon, DesktopTowerIcon, HardDrivesIcon, ListIcon, LockIcon, SparkleIcon, XIcon } from '@phosphor-icons/react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/logo'
import { ReviewerBanner } from '@/components/blog/ReviewerBanner'
import { NavSubmenu, type NavSubmenuItem } from '@/components/layout/nav-submenu'
import NavLinuxIcon from '@/assets/svg/nav-linux-icon.svg'
import NavAppleIcon from '@/assets/svg/nav-apple-icon.svg'

const TENKI_STORAGE_BASE = 'https://storage.googleapis.com/tenki-cloud-assets/web'
const TENKI_WEB_BASE = 'https://tenki.cloud'

interface NavItem {
  label: string
  href: string
  submenu?: NavSubmenuItem[]
}

const navItems: NavItem[] = [
  { label: 'Features', href: '/features', submenu: [
      {
        label: 'x64 Runners',
        href: '/features/linux',
        image: `${TENKI_STORAGE_BASE}/nav-linux-runners.png`,
        icon: <NavLinuxIcon className="size-4" />,
        soon: false,
      },
      {
        label: 'Mac Runners',
        href: '/features/mac',
        image: `${TENKI_STORAGE_BASE}/nav-mac-runners.png`,
        icon: <NavAppleIcon className="size-4" />,
        soon: false,
      },
      {
        label: 'Code Reviewer',
        href: '/features/code-reviewer',
        image: `${TENKI_STORAGE_BASE}/nav-reviewers.png`,
        icon: <SparkleIcon weight="fill" size={16} />,
        new: true,
        soon: false,
      },
      {
        label: 'Virtual Machines',
        href: '/features/virtual-machine',
        image: `${TENKI_STORAGE_BASE}/nav-vm.png`,
        icon: <HardDrivesIcon weight="fill" size={16} />,
        soon: true,
      },
    ] },
  {
    label: 'Solutions',
    href: '/solutions',
    submenu: [
      {
        label: 'Enterprise',
        href: '/solutions/enterprise',
        image: `${TENKI_STORAGE_BASE}/nav-enterprise.png`,
        icon: <BuildingsIcon weight="fill" size={16} />,
        soon: false,
      },
      {
        label: 'Open Source Projects',
        href: '/solutions/open-source',
        image: `${TENKI_STORAGE_BASE}/nav-open-sources.png`,
        icon: <ArchiveIcon weight="fill" size={16} />,
        soon: false,
      },
      {
        label: 'Solo Devs',
        href: '/solutions/solo-devs',
        image: `${TENKI_STORAGE_BASE}/nav-solo-devs.png`,
        icon: <DesktopTowerIcon weight="fill" size={16} />,
        soon: false,
      },
      {
        label: 'Small & Mid-sized',
        href: '/solutions/smb',
        image: `${TENKI_STORAGE_BASE}/nav-smb.png`,
        icon: <ChartBarIcon weight="fill" size={16} />,
        soon: false,
      },
    ],
  },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  {
    label: 'Company',
    href: '/company',
    submenu: [
      {
        label: 'Blog',
        href: '/company/blog',
        image: `${TENKI_STORAGE_BASE}/nav-blog.png`,
        icon: <ArchiveIcon weight="fill" size={16} />,
        soon: false,
      },
      {
        label: 'About',
        href: '/company/about',
        image: `${TENKI_STORAGE_BASE}/nav-about.png`,
        icon: <BuildingsIcon weight="fill" size={16} />,
        soon: false,
      },
      {
        label: 'Careers',
        href: '/company/careers',
        image: `${TENKI_STORAGE_BASE}/nav-careers.png`,
        icon: <BriefcaseIcon weight="fill" size={16} />,
        soon: false,
      },
      {
        label: 'Security',
        href: '/company/security',
        image: `${TENKI_STORAGE_BASE}/nav-security.png`,
        icon: <LockIcon weight="fill" size={16} />,
        soon: false,
      },
    ],
  },
]

export const Navigation = () => {
  const currentPath = usePathname()
  const { scrollY } = useScroll()

  const [hoveredNavItem, setHoveredNavItem] = useState<number | null>(null)
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null)
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState<number[]>([])
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 50)
  })

  useEffect(() => {
    setHoveredNavItem(null)
    setOpenSubmenu(null)
  }, [currentPath])

  const isNavItemActive = (currentPath: string, href: string) =>
    currentPath === href || (href !== '/' && currentPath.startsWith(href))

  const isSubItemActive = (currentPath: string, href: string) => currentPath === href || currentPath.startsWith(href)
  const toTenkiUrl = (href: string) => (href.startsWith('http') ? href : `${TENKI_WEB_BASE}${href}`)

  const toggleMobileSubmenu = (idx: number) => {
    setOpenMobileSubmenus((prev) => (prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]))
  }

  return (
    <header className={cn('w-full')}>
      <ReviewerBanner hidden={scrolled || isSheetOpen} />
      <div className="flex w-full justify-center">
        <motion.nav
          className={cn(
            'fixed z-[999] w-full max-w-[1200px] border-[#1D232A] transition-all duration-300 ease-in-out xl:rounded-xl',
            scrolled && !isSheetOpen && 'mt-3.5 w-[calc(100%-8px)] rounded-xl border md:w-[calc(100%-16px)] lg:w-full xl:mx-auto xl:mt-6 xl:max-w-[1200px]',
          )}
          onMouseLeave={() => {
            setOpenSubmenu(null)
          }}
          style={{
            background:
              'linear-gradient(to right, rgba(0,10,21,0) 0%, rgba(0,10,21,0.7) 34%, rgba(0,10,21,1) 48%, rgba(0,10,21,0.7) 61%, rgba(0,10,21,0) 100%)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            className={cn(
              'relative mx-auto flex items-center justify-between p-3 transition-colors duration-300 md:p-4 lg:gap-0',
              'lg:px-10 xl:mt-0 xl:rounded-lg xl:border-0 xl:px-4 xl:backdrop-blur-none',
              isSheetOpen && 'border-b-0.5 mx-2 mt-3.5 rounded-t-lg border border-white/8 px-2 md:px-4',
            )}
          >
            <div className="flex items-center justify-between lg:min-w-44">
              <Link href={TENKI_WEB_BASE} aria-label="home" className="flex items-center space-x-2">
                <Logo className="w-[75px] md:w-[120px]" />
              </Link>
            </div>

            <ul className="mx-auto hidden divide-x divide-solid divide-white/[4%] rounded-lg lg:flex">
              {navItems.map((item, idx) => {
                const isActive = isNavItemActive(currentPath, item.href)
                const showBackground = hoveredNavItem === idx
                const isSubMenuOpen = openSubmenu === idx

                return (
                  <li
                    key={`nav-desktop-${idx}`}
                    onMouseEnter={() => {
                      setHoveredNavItem(idx)
                      setOpenSubmenu(idx)
                    }}
                    onMouseLeave={() => {
                      setHoveredNavItem(null)
                      setOpenSubmenu(null)
                    }}
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
                    {item.submenu ? (
                      <>
                        <div className="relative flex cursor-default items-center gap-0.5">
                          {item.label}
                          <CaretDownIcon size={12} weight="bold" />
                        </div>
                        <NavSubmenu
                          submenu={item.submenu}
                          isVisible={isSubMenuOpen}
                          onHover={() => setOpenSubmenu(idx)}
                          onLeave={() => setOpenSubmenu(null)}
                        />
                      </>
                    ) : (
                      <Link
                        href={toTenkiUrl(item.href)}
                        className="relative"
                        onClick={() => {
                          setHoveredNavItem(null)
                          setOpenSubmenu(null)
                        }}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                className={cn(
                  buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  }),
                )}
                href="https://app.tenki.cloud/auth/login"
                target="_blank"
              >
                Login
              </Link>
              <Link
                className={cn(buttonVariants({ size: 'sm' }))}
                href="https://app.tenki.cloud/auth/registration"
                target="_blank"
              >
                Start For Free
              </Link>

              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen} modal={true}>
                <SheetTrigger asChild>
                  <Button
                    aria-label={isSheetOpen ? 'Close Menu' : 'Open Menu'}
                    variant="ghost"
                    className="pointer-events-auto relative flex size-10 items-center justify-center lg:hidden"
                  >
                    <ListIcon
                      className={cn(
                        'absolute transition-opacity duration-200 lg:hidden',
                        isSheetOpen && 'rotate-180 opacity-0',
                      )}
                    />
                    <XIcon
                      className={cn(
                        'absolute transition-opacity duration-200 lg:hidden',
                        !isSheetOpen && 'rotate-180 opacity-0',
                      )}
                    />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  className={cn(
                    'inset-0 mt-14 min-w-screen bg-[#000D1B]/90 px-2 backdrop-blur-sm lg:hidden',
                    'custom-scrollbar max-h-[calc(100vh-56px)] touch-pan-y overflow-y-auto overscroll-contain',
                  )}
                  side={'left'}
                >
                  <SheetHeader className="hidden">
                    <SheetTitle />
                  </SheetHeader>
                  <ul
                    className={cn(
                      'border-t-0.5 divide-y divide-solid divide-white/[8%] rounded-b-lg border border-white/8',
                      'custom-scrollbar',
                    )}
                  >
                    {navItems.map((item, idx) => {
                      const hasSubmenu = !!item.submenu
                      const isOpen = openMobileSubmenus.includes(idx)
                      return (
                        <React.Fragment key={idx}>
                          {hasSubmenu ? (
                            <li
                              className={cn(
                                'text-static-secondary flex cursor-pointer items-center justify-between px-3 py-4 text-sm',
                                item.href && currentPath.includes(item.href) && 'text-static-primary font-bold',
                              )}
                              onClick={() => toggleMobileSubmenu(idx)}
                            >
                              <span>{item.label}</span>
                              <CaretDownIcon size={16} className={cn('transition-transform', isOpen && 'rotate-180')} />
                            </li>
                          ) : (
                            <li>
                              <Link
                                href={toTenkiUrl(item.href)}
                                onClick={() => setIsSheetOpen(false)}
                                className={cn(
                                  'text-static-secondary flex justify-between px-3 py-4 text-sm',
                                  currentPath === item.href && 'text-static-primary font-bold',
                                )}
                              >
                                {item.label}
                              </Link>
                            </li>
                          )}
                          {hasSubmenu &&
                            isOpen &&
                            item.submenu?.map((sub, sIdx) => {
                              const isActive = isSubItemActive(currentPath, sub.href)
                              return (
                                <li key={sIdx}>
                                  <Link
                                    href={toTenkiUrl(sub.href)}
                                    onClick={() => setIsSheetOpen(false)}
                                    className={cn(
                                      'flex items-center gap-2 px-3 py-4 text-sm transition-colors',
                                      isActive ? 'text-static-primary' : 'text-static-secondary',
                                    )}
                                  >
                                    {sub.icon}
                                    {sub.label}
                                  </Link>
                                </li>
                              )
                            })}
                        </React.Fragment>
                      )
                    })}
                  </ul>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </motion.nav>
      </div>
    </header>
  )
}
