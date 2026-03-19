import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const baseUrl = 'https://tenki.cloud/blog'

  const [posts, categories, tags] = await Promise.all([
    payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 1000,
      depth: 0,
      overrideAccess: true,
    }),
    payload.find({ collection: 'categories', limit: 100, depth: 0, overrideAccess: true }),
    payload.find({ collection: 'tags', limit: 100, depth: 0, overrideAccess: true }),
  ])

  const entries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
  ]

  posts.docs.forEach((post) => {
    entries.push({
      url: `${baseUrl}/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  categories.docs.forEach((cat) => {
    entries.push({
      url: `${baseUrl}/category/${cat.slug}`,
      changeFrequency: 'weekly',
      priority: 0.6,
    })
  })

  tags.docs.forEach((tag) => {
    entries.push({
      url: `${baseUrl}/tag/${tag.slug}`,
      changeFrequency: 'weekly',
      priority: 0.5,
    })
  })

  return entries
}
