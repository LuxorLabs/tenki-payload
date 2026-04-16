import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { ContentSection } from '@/components/blog/ContentSection'
import { RelatedNews } from '@/components/blog/RelatedNews'
import { Introduction } from '@/components/blog/Introduction'
import { BlogMeta } from '@/components/blog/BlogMeta'
import { BlogStickyHeader } from '@/components/blog/BlogStickyHeader'
import { BlogPostTags } from '@/components/blog/BlogPostTags'
import { BLOG_CARD_SELECT, BLOG_CARD_POPULATE } from '@/lib/queries'
import type { Post, Category, Media, Author } from '@/payload-types'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamic = 'force-static'
export const revalidate = 3600

const getPost = cache(async (slug: string) => {
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      slug: { equals: slug },
      status: { equals: 'published' },
    },
    limit: 1,
    depth: 2,
    overrideAccess: true,
  })

  return docs[0] as Post | undefined
})

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
  const url = `https://tenki.cloud/blog/${post.slug}`

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
    ? (post.tags as any[]).map((tag) => (typeof tag === 'number' ? tag : tag.id)).filter(Boolean)
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
    select: BLOG_CARD_SELECT,
    populate: BLOG_CARD_POPULATE,
  })

  const relatedPosts = relatedPostsQuery.docs as Post[]

  const author = post.author as Author | undefined
  const category = post.category as Category | undefined
  const featuredImage = post.featuredImage as Media | undefined
  const postUrl = `https://tenki.cloud/blog/${post.slug}`

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: postUrl,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    ...(featuredImage?.url && {
      image: {
        '@type': 'ImageObject',
        url: featuredImage.url,
        ...(featuredImage.width && { width: featuredImage.width }),
        ...(featuredImage.height && { height: featuredImage.height }),
      },
    }),
    ...(author && {
      author: {
        '@type': 'Person',
        name: author.name,
        ...(author.socialLinks?.linkedin && { url: author.socialLinks.linkedin }),
        ...(author.socialLinks?.twitter && { sameAs: [author.socialLinks.twitter] }),
      },
    }),
    publisher: {
      '@type': 'Organization',
      name: 'Tenki',
      url: 'https://tenki.cloud',
      logo: {
        '@type': 'ImageObject',
        url: 'https://storage.googleapis.com/tenki-cloud-assets/web/tenki-open-graph.webp',
      },
    },
    ...(post.readingTime && {
      timeRequired: `PT${post.readingTime}M`,
    }),
    ...(category && {
      articleSection: category.name,
    }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Blog',
        item: 'https://tenki.cloud/blog',
      },
      ...(category
        ? [
            {
              '@type': 'ListItem',
              position: 2,
              name: category.name,
              item: `https://tenki.cloud/blog/category/${category.slug}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: category ? 3 : 2,
        name: post.title,
        item: postUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogStickyHeader />
      <BlogMeta post={post} />
      <ContentSection post={post} />
      <div className="mx-auto max-w-[calc(100%-32px)] xl:max-w-[1080px] 2xl:max-w-[1200px]">
        <BlogPostTags post={post} />
      </div>
      <RelatedNews posts={relatedPosts} selectedPost={post} />
    </>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  // D1 doesn't support concurrent queries at build time (SQLITE_BUSY),
  // so pages are statically generated on first request instead
  return []
}
