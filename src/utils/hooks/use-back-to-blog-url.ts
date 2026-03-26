import { useState, useEffect } from 'react'

const STORAGE_KEY = 'blogListingUrl'

export function useBackToBlogUrl(): string {
  const [url, setUrl] = useState('/')

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      setUrl(stored === '/' ? '/' : `/${stored}`)
    }
  }, [])

  return url
}
