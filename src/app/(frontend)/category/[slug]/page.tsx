import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { BlogCard } from '@/components/blog/BlogCard'
import { ArrowLeft } from 'lucide-react'
import type { Post, Category } from '@/payload-types'

interface CategoryPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getCategory(slug: string) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'categories',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
    overrideAccess: true,
  })

  return docs[0] as Category | undefined
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.name} | Tenki Blog`,
    description: category.description || `Posts in ${category.name} category`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    depth: 1,
    where: {
      category: { equals: category.id },
      status: { equals: 'published' },
    },
    sort: '-publishedAt',
    limit: 50,
    overrideAccess: true,
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground">{category.description}</p>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No posts found in this category yet.
          </p>
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
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'categories',
    limit: 100,
    depth: 0,
    overrideAccess: true,
  })

  return docs.map((cat) => ({ slug: cat.slug }))
}
