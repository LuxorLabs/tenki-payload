'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'
import { BlogTag } from './BlogTag'
import { BlogAuthor } from './BlogAuthor'
import { cn } from '@/lib/utils'
import type { Post, Author, Media } from '@/payload-types'

interface RelatedNewsCardProps {
  post: Post
  className?: string
}

const BLOG_DEFAULT_IMG = '/images/blog-default.jpg'

export function RelatedNewsCard({ post, className }: RelatedNewsCardProps) {
  const author = post.author as Author
  const featuredImage = post.featuredImage as Media
  const datePublished = post.publishedAt || post.createdAt

  let featuredImageUrl = BLOG_DEFAULT_IMG
  if (featuredImage?.url) {
    featuredImageUrl = featuredImage.url.startsWith('http') ? featuredImage.url : featuredImage.url
  }

  return (
    <Link href={`/${post.slug}`} className={cn("transition-colors duration-200", className)}>
      <article className="group flex min-w-0 max-w-full flex-col gap-3">
        <div className="relative aspect-[317/170] w-full overflow-hidden rounded-sm transition-transform duration-300 border border-bluish-gray-600">
          <Image
            src={featuredImageUrl}
            alt={featuredImage?.alt || post.title}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-sm">
            {post.tags && <BlogTag post={post} />}
            {post.tags && datePublished && (
              <span className="text-static-secondary">·</span>
            )}
            {datePublished && (
              <span className="text-static-secondary text-sm">
                {format(new Date(datePublished), 'MMM yyyy')}
              </span>
            )}
          </div>

          <p className="line-clamp-2 text-lg font-medium leading-7 text-white">
            {post.title}
          </p>

          {author && (
            <BlogAuthor author={author} datePublished={datePublished} showDate={false} />
          )}
        </div>
      </article>
    </Link>
  )
}
