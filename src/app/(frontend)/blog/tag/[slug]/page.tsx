import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BlogCard } from '@/components/blog/BlogCard'
import { ArrowLeft } from 'lucide-react'
import type { Post, Tag } from '@/payload-types'

interface TagPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: TagPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'tags',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const tag = docs[0] as Tag | undefined

  if (!tag) {
    return {
      title: 'Tag Not Found',
    }
  }

  return {
    title: `#${tag.name} | Tenki Blog`,
    description: `Posts tagged with ${tag.name}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs: tags } = await payload.find({
    collection: 'tags',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  const tag = tags[0] as Tag | undefined

  if (!tag) {
    notFound()
  }

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 2,
    where: {
      tags: { contains: tag.id },
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 50,
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">#{tag.name}</h1>
        <p className="text-lg text-muted-foreground">Posts tagged with {tag.name}</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No posts found with this tag yet.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post as Post} />
          ))}
        </div>
      )}
    </div>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return []
}
