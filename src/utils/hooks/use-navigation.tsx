import {
  BriefcaseIcon,
  CodeBlockIcon,
  CodeIcon,
  FilesIcon,
  ListChecksIcon,
  LockIcon,
} from '@phosphor-icons/react'

import React from 'react'
import NavCodeReviewerIcon from '@/assets/svg/nav-code-reviewer-icon.svg'
import { TENKI_STORAGE_BASE, TENKI_WEB_BASE } from '@/components/constants/metadata'
import NavAboutIcon from '@/assets/svg/nav-about-icon.svg'

const navigationItems = [
  {
    href: `${TENKI_WEB_BASE}/pricing`,
    label: 'Pricing',
  },
  {
    label: 'Features',
    submenu: [
      {
        label: 'Code Reviewer',
        href: `${TENKI_WEB_BASE}/features/code-reviewer`,
        image: `${TENKI_STORAGE_BASE}/nav-reviewer-2.png`,
        icon: <NavCodeReviewerIcon />,
        new: true,
        soon: false,
      },
      {
        label: 'Runners',
        href: `${TENKI_WEB_BASE}/features/runners`,
        image: `${TENKI_STORAGE_BASE}/nav-runners.png`,
        icon: <ListChecksIcon weight="bold" size={16} />,
        soon: false,
      },
      {
        label: 'Agent Sandbox',
        href: `${TENKI_WEB_BASE}/features/sandbox`,
        image: `${TENKI_STORAGE_BASE}/nav-sandbox.png`,
        icon: <CodeIcon weight="bold" size={16} />,
        soon: true,
      },
    ],
  },
  {
    href: `${TENKI_WEB_BASE}/docs`,
    label: 'Docs',
  },
  {
    label: 'Company',
    submenu: [
      {
        label: 'Security',
        href: `${TENKI_WEB_BASE}/company/security`,
        image: `${TENKI_STORAGE_BASE}/nav-security-2.png`,
        icon: <LockIcon weight={'fill'} size={16} />,
        soon: false,
      },
      {
        label: 'Blog',
        href: '/blog',
        image: `${TENKI_STORAGE_BASE}/nav-blog-2.png`,
        icon: <FilesIcon weight={'fill'} size={16} />,
        soon: false,
      },
      {
        label: 'About',
        href: `${TENKI_WEB_BASE}/company/about`,
        image: `${TENKI_STORAGE_BASE}/nav-about-2.png`,
        icon: <NavAboutIcon />,
        soon: false,
      },
      {
        label: 'Careers',
        href: `${TENKI_WEB_BASE}/company/careers`,
        image: `${TENKI_STORAGE_BASE}/nav-careers-2.png`,
        icon: <BriefcaseIcon weight="fill" size={16} />,
        soon: false,
      },
    ],
  },
]

export const useNavigation = () => {
  const items = navigationItems.map((item) => ({
    ...item,
    submenu: item.submenu ? [...item.submenu] : undefined,
  }))

  return [items]
}

export const isPathActive = (currentPath: string, href?: string): boolean => {
  if (!href) return false
  return currentPath === href || (href !== '/' && currentPath.startsWith(href))
}
