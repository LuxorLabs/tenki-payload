import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Posts } from '@/components/blog/Posts'
import { HeroSection } from '@/components/blog/HeroSection'
import type { Post, Tag } from '@/payload-types'

export const metadata = {
  title: 'Tenki Blog | Product Updates, Guides, Tutorials, & Tips',
  description:
    'Tenki Blog',
}

export const revalidate = 60

export default async function BlogPage() {
  const payload = await getPayload({ config })

  const [postsResponse, tagsResponse] = await Promise.all([
    payload.find({
      collection: 'posts',
      depth: 2,
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      limit: 10,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'tags',
      limit: 100,
      overrideAccess: true,
    }),
  ])

  const posts = postsResponse.docs as Post[]
  const tags = tagsResponse.docs as Tag[]

  return (
    <>
      <HeroSection />
      <section>
        <Posts posts={posts} tags={tags} />
      </section>
    </>
  )
}
