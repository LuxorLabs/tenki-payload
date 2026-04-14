import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Category } from '@/payload-types'

export const dynamic = 'force-static'
export const revalidate = 3600

export async function GET() {
  const payload = await getPayload({ config })
  const baseUrl = 'https://tenki.cloud/blog'

  const posts = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 100,
    sort: '-publishedAt',
    depth: 1,
    overrideAccess: true,
  })

  const categories = await payload.find({
    collection: 'categories',
    limit: 50,
    depth: 0,
    overrideAccess: true,
  })

  const postsByCategory = new Map<string, typeof posts.docs>()
  const uncategorized: typeof posts.docs = []

  for (const post of posts.docs) {
    const category = post.category as Category | undefined
    if (category?.name) {
      const existing = postsByCategory.get(category.name) || []
      existing.push(post)
      postsByCategory.set(category.name, existing)
    } else {
      uncategorized.push(post)
    }
  }

  let content = `# Tenki Blog

> Product updates, guides, tutorials, and tips from the Tenki team. Tenki provides GPU-accelerated GitHub Actions runners and AI-powered code review for developer teams.

- Main site: https://tenki.cloud
- Blog: ${baseUrl}
- RSS: ${baseUrl}/rss.xml

## Blog Posts
`

  for (const [categoryName, categoryPosts] of postsByCategory) {
    content += `\n### ${categoryName}\n\n`
    for (const post of categoryPosts) {
      content += `- [${post.title}](${baseUrl}/${post.slug}): ${post.excerpt}\n`
    }
  }

  if (uncategorized.length > 0) {
    content += `\n### Other\n\n`
    for (const post of uncategorized) {
      content += `- [${post.title}](${baseUrl}/${post.slug}): ${post.excerpt}\n`
    }
  }

  content += `\n## Categories\n\n`
  for (const cat of categories.docs) {
    content += `- [${cat.name}](${baseUrl}/category/${cat.slug})${cat.description ? `: ${cat.description}` : ''}\n`
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
