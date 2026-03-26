/**
 * Backfill readingTime for existing posts that don't have it set.
 *
 * Usage:
 *   pnpm backfill-reading-time
 */

import { getPayload } from 'payload'
import config from '../payload.config'

function extractText(node: any): string {
  if (node.text) return node.text
  if (node.children) return node.children.map(extractText).join(' ')
  return ''
}

function computeReadingTime(content: any): number {
  if (!content?.root?.children) return 0
  const text = content.root.children.map(extractText).join(' ')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

async function backfill() {
  const payload = await getPayload({ config })

  const missingFilter = {
    or: [
      { readingTime: { equals: null } },
      { readingTime: { equals: 0 } },
    ],
  }

  // Fetch published posts
  const { docs: published } = await payload.find({
    collection: 'posts',
    where: missingFilter,
    limit: 0,
    overrideAccess: true,
  })

  // Fetch drafts (excluded by default)
  const { docs: drafts } = await payload.find({
    collection: 'posts',
    where: missingFilter,
    limit: 0,
    overrideAccess: true,
    draft: true,
  })

  // Deduplicate (a draft and published version can share the same id)
  const postsMap = new Map<number | string, typeof published[0]>()
  for (const post of [...published, ...drafts]) {
    postsMap.set(post.id, post)
  }
  const posts = Array.from(postsMap.values())

  console.log(`Found ${posts.length} posts missing readingTime (${published.length} published, ${drafts.length} drafts)\n`)

  let updated = 0
  for (const post of posts) {
    const readingTime = computeReadingTime(post.content)

    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { readingTime },
      overrideAccess: true,
      draft: post._status === 'draft',
    })

    updated++
    console.log(`  [updated] ${post.title} (${post._status ?? 'published'}) → ${readingTime} min`)
  }

  console.log(`\nDone. Updated ${updated} posts.`)
  process.exit(0)
}

backfill().catch((err) => {
  console.error('Backfill failed:', err)
  process.exit(1)
})
