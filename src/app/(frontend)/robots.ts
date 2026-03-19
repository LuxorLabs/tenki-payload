import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.NEXT_PUBLIC_SITE_URL?.includes('tenki.cloud')

  if (!isProduction) {
    return {
      rules: { userAgent: ['*'], disallow: ['/'] },
    }
  }

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://tenki.cloud/blog/sitemap.xml',
  }
}
