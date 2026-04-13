'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogAuthor } from './BlogAuthor'
import { BlogTag } from './BlogTag'
import type { Post, Author, Media } from '@/payload-types'

interface BlogCardProps {
  post: Post
}

const BLOG_DEFAULT_IMG = '/images/blog-default.jpg'

export function BlogCard({ post }: BlogCardProps) {
  const author = post.author as Author
  const featuredImage = post.featuredImage as Media

  // Get featured image URL
  let featuredImageUrl = BLOG_DEFAULT_IMG
  if (featuredImage?.url) {
    featuredImageUrl = featuredImage.url.startsWith('http') ? featuredImage.url : featuredImage.url
  }

  return (
    <Link href={`/${post.slug}`} className="transition-colors duration-200">
      <article className="group flex min-w-0 max-w-full flex-col gap-y-2">
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

        {(post.publishedAt || post.createdAt) && author && (
          <div className={' mt-1'}>
            <BlogAuthor author={author} datePublished={post.publishedAt || post.createdAt} />
          </div>
        )}
        <p className="line-clamp-2 h-[56px] max-h-[56px] text-lg font-medium">{post.title}</p>
        {post.tags && <BlogTag post={post} displayReadTime />}
      </article>
    </Link>
  )
}
