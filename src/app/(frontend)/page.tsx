import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Posts } from '@/components/blog/Posts'
import { HeroSection } from '@/components/blog/HeroSection'
import { calculateReadingTime } from '@/lib/utils'
import type { Post, Tag } from '@/payload-types'

export const metadata = {
  title: 'Tenki Blog | Product Updates, Guides, Tutorials, & Tips',
  description: 'Product updates, guides, tutorials, and tips from the Tenki team.',
}

export const revalidate = 60

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const postsResponse = await payload.find({
    collection: 'posts',
    depth: 2,
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 100,
    overrideAccess: true,
  })

  // Pre-calculate reading time server-side and strip heavy content/seo fields
  // to reduce the RSC payload sent to the client
  const posts = postsResponse.docs.map((doc) => {
    const readingTime = doc.readingTime || (() => {
      const extractText = (node: any): string => {
        if (node?.text) return node.text
        if (node?.children) return node.children.map(extractText).join(' ')
        return ''
      }
      const text = doc.content?.root?.children?.map(extractText).join(' ') || ''
      return calculateReadingTime(text)
    })()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, seo, excerpt, category, ...rest } = doc
    return { ...rest, readingTime, content: undefined } as unknown as Post
  })

  // Extract unique tags from published posts only
  const tagsMap = new Map<number, Tag>()
  for (const post of posts) {
    if (post.tags) {
      for (const tag of post.tags) {
        if (typeof tag !== 'number' && tag.id) {
          tagsMap.set(tag.id, tag)
        }
      }
    }
  }
  const tags = Array.from(tagsMap.values())

  return (
    <>
      <HeroSection />
      <section>
        <Posts posts={posts} tags={tags} />
      </section>
    </>
  )
}
