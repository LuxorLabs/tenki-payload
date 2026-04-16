import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Posts } from '@/components/blog/Posts'
import { HeroSection } from '@/components/blog/HeroSection'
import type { Post, Category } from '@/payload-types'
import { BLOG_CARD_SELECT, BLOG_CARD_POPULATE } from '@/lib/queries'

export const metadata = {
  title: 'Tenki Blog | Product Updates, Guides, Tutorials, & Tips',
  description: 'Product updates, guides, tutorials, and tips from the Tenki team.',
}

export const revalidate = 300

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
    select: BLOG_CARD_SELECT,
    populate: BLOG_CARD_POPULATE,
  })

  const posts = postsResponse.docs as Post[]

  // Extract unique categories from published posts
  const categoriesMap = new Map<number, Category>()
  for (const post of posts) {
    if (post.category && typeof post.category !== 'number') {
      categoriesMap.set(post.category.id, post.category)
    }
  }
  const categories = Array.from(categoriesMap.values())

  return (
    <>
      <HeroSection />
      <section>
        <Suspense>
          <Posts posts={posts} categories={categories} />
        </Suspense>
      </section>
    </>
  )
}
