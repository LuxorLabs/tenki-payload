import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { ContentSection } from '@/components/blog/ContentSection'
import { RelatedNews } from '@/components/blog/RelatedNews'
import { Introduction } from '@/components/blog/Introduction'
import { BlogMeta } from '@/components/blog/BlogMeta'
import type { Post, Category, Media } from '@/payload-types'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-static'

async function getPost(slug: string) {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 1,
    overrideAccess: true,
  })

  return docs[0] as Post | undefined
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImage = post.seo?.ogImage as Media | undefined
  const featuredImage = post.featuredImage as Media

  const title = post.seo?.metaTitle || post.title
  const description = post.seo?.metaDescription || post.excerpt
  const image = ogImage?.url || featuredImage?.url
  const url = `https://blog.tenki.cloud/${post.slug}`

  return {
    title,
    description,
    keywords: post.seo?.keywords?.map((k) => k.keyword),
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: 'Tenki',
      images: image ? [{ url: image, width: 1200, height: 630, alt: title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [],
    },
    ...(post.seo?.canonicalURL && { alternates: { canonical: post.seo.canonicalURL } }),
    ...(post.seo?.noIndex && { robots: { index: false, follow: false } }),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const payload = await getPayload({ config })

  // Extract tag IDs and category ID for related posts
  const tagIds = post.tags
    ? (post.tags as any[])
        .map((tag) => (typeof tag === 'number' ? tag : tag.id))
        .filter(Boolean)
    : []

  const categoryId =
    typeof post.category === 'number' ? post.category : (post.category as Category)?.id

  // Fetch related posts
  const relatedPostsQuery = await payload.find({
    collection: 'posts',
    where: {
      and: [
        {
          id: {
            not_equals: post.id,
          },
        },
        {
          status: {
            equals: 'published',
          },
        },
        {
          or: [
            categoryId
              ? {
                  category: {
                    equals: categoryId,
                  },
                }
              : {},
            tagIds.length > 0
              ? {
                  tags: {
                    in: tagIds,
                  },
                }
              : {},
          ],
        },
      ],
    },
    limit: 4,
    depth: 1,
    overrideAccess: true,
  })

  const relatedPosts = relatedPostsQuery.docs as Post[]

  return (
    <>
      <Introduction />
      <BlogMeta post={post} />
      <ContentSection post={post} />
      <RelatedNews posts={relatedPosts} selectedPost={post} />
    </>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    limit: 1000,
    depth: 0,
    overrideAccess: true,
  })

  return docs.map((post) => ({ slug: post.slug }))
}
