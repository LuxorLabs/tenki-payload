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

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      or: [
        { readingTime: { equals: null } },
        { readingTime: { equals: 0 } },
      ],
    },
    limit: 0,
    overrideAccess: true,
  })

  console.log(`Found ${posts.length} posts missing readingTime\n`)

  let updated = 0
  for (const post of posts) {
    const readingTime = computeReadingTime(post.content)

    await payload.update({
      collection: 'posts',
      id: post.id,
      data: { readingTime },
      overrideAccess: true,
    })

    updated++
    console.log(`  [updated] ${post.title} → ${readingTime} min`)
  }

  console.log(`\nDone. Updated ${updated} posts.`)
  process.exit(0)
}

backfill().catch((err) => {
  console.error('Backfill failed:', err)
  process.exit(1)
})
