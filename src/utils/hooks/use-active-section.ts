import { useEffect, useState } from 'react'

export const useActiveSection = (headingIds: string[]) => {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    if (headingIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)

        if (visibleEntries.length > 0) {
          const topEntry = visibleEntries.reduce((prev, current) => {
            return prev.boundingClientRect.top < current.boundingClientRect.top ? prev : current
          })

          setActiveId(topEntry.target.id)
        }
      },
      {
        rootMargin: '-20% 0% -60% 0%',
        threshold: 0,
      },
    )

    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [headingIds])

  return activeId
}
