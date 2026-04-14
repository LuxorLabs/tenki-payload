import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Author, Category, Media } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const payload = await getPayload({ config })
  const baseUrl = 'https://tenki.cloud/blog'

  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 50,
    sort: '-publishedAt',
    depth: 1,
    overrideAccess: true,
  })

  const items = posts.docs
    .map((post) => {
      const author = post.author as Author | undefined
      const category = post.category as Category | undefined
      const featuredImage = post.featuredImage as Media | undefined
      const pubDate = post.publishedAt
        ? new Date(post.publishedAt).toUTCString()
        : new Date(post.createdAt).toUTCString()

      return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${pubDate}</pubDate>${author ? `\n      <dc:creator><![CDATA[${author.name}]]></dc:creator>` : ''}${category ? `\n      <category><![CDATA[${category.name}]]></category>` : ''}${featuredImage?.url ? `\n      <enclosure url="${featuredImage.url}" type="${featuredImage.mimeType || 'image/webp'}" length="0" />` : ''}
    </item>`
    })
    .join('\n')

  const lastBuildDate = posts.docs[0]
    ? new Date(posts.docs[0].publishedAt || posts.docs[0].createdAt).toUTCString()
    : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tenki Blog</title>
    <link>${baseUrl}</link>
    <description>Product updates, guides, tutorials, and tips from the Tenki team.</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
