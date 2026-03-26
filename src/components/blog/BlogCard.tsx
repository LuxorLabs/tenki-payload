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
    featuredImageUrl = featuredImage.url.startsWith('http')
      ? featuredImage.url
      : featuredImage.url
  }

  return (
    <Link
      href={`/${post.slug}`}
      className="transition-colors duration-200"
      onClick={() => {
        // Only save listing URL when navigating from the blog listing page (not from a post page)
        if (window.location.pathname === '/') {
          sessionStorage.setItem('blogListingUrl', window.location.search || '/')
        }
      }}
    >
      <article className="group flex min-w-0 max-w-full flex-col gap-y-3">
        <div className="relative aspect-[331/240] w-full overflow-hidden rounded-md transition-transform duration-300">
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
          <BlogAuthor author={author} datePublished={post.publishedAt || post.createdAt} />
        )}
        <p className="line-clamp-2 h-[56px] max-h-[56px] text-lg font-semibold">{post.title}</p>
        {post.tags && <BlogTag post={post} displayReadTime />}
      </article>
    </Link>
  )
}
