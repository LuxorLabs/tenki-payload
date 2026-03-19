'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

import type { GlobeConfig } from '@/components/animation/animated-globe'
import { cn } from '@/lib/utils'

const World = dynamic(
  async () => {
    const mod = await import('@/components/animation/animated-globe')
    return mod.World
  },
  { ssr: false },
)

type GlobeLazyProps = {
  config?: Partial<GlobeConfig>
  className?: string
}

export function GlobeLazy({ config, className }: GlobeLazyProps) {
  const [showGlobe, setShowGlobe] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowGlobe(true)
          if (ref.current) observer.unobserve(ref.current)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px 200px 0px',
      },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const globeConfig: GlobeConfig = {
    pointSize: 4,
    globeColor: '#0D1A2A',
    showAtmosphere: true,
    atmosphereColor: '#6cb2ff',
    atmosphereAltitude: 0.3,
    emissive: '#062056',
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: 'rgba(96,195,250,1)',
    ambientLight: '#38bdf8',
    directionalLeftLight: '#ffffff',
    directionalTopLight: '#ffffff',
    pointLight: '#ffffff',
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: {
      lat: 22.3193,
      lng: 114.1694,
    },
    autoRotate: true,
    autoRotateSpeed: 0.5,
    ...config,
  }

  return (
    <div ref={ref} className={cn('relative h-[458px] w-full', className)}>
      {showGlobe && <World key={pathname} globeConfig={globeConfig} />}
    </div>
  )
}
