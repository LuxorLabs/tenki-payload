import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Posts } from '@/components/blog/Posts'
import { HeroSection } from '@/components/blog/HeroSection'
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
    depth: 1,
    where: {
      status: {
        equals: 'published',
      },
    },
    sort: '-publishedAt',
    limit: 10,
    overrideAccess: true,
  })

  const posts = postsResponse.docs as Post[]

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
