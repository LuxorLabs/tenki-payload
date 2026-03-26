'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BlogAuthor } from './BlogAuthor'
import { BlogTag } from './BlogTag'
import { Button } from '@/components/ui/button'
import type { Post, Media } from '@/payload-types'

type BlogMetaProps = {
  post: Post
}

const BLOG_DEFAULT_IMG = '/images/tenki-blog.png'

export const BlogMeta = ({ post }: BlogMetaProps) => {
  const [copied, setCopied] = useState(false)

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  // Get featured image URL
  const featuredImage = post.featuredImage as Media
  const featuredImageUrl = featuredImage?.url
    ? featuredImage.url.startsWith('http')
      ? featuredImage.url
      : featuredImage.url
    : BLOG_DEFAULT_IMG

  return (
    <section className="mx-auto mt-[-220px] flex w-full max-w-[1000px] flex-col px-6 md:px-12 lg:items-start lg:justify-between xl:px-0">
      <div className="flex w-full flex-col">
        <div className="relative aspect-video w-full">
          <Image
            src={featuredImageUrl}
            alt={featuredImage?.alt || post.title}
            fill
            className="object-cover"
            loading="lazy"
            style={{ borderRadius: '6px' }}
          />
        </div>
        <div className="my-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
            {(post.publishedAt || post.createdAt) && post.author && (
              <BlogAuthor author={post.author} datePublished={post.publishedAt || post.createdAt} />
            )}
            <div className="z-10 flex shrink-0 items-center gap-2">
              <div className="size-0.5 bg-white" />
              <Button
                variant="link"
                onClick={copyArticleLink}
                className="text-cta-link-rest h-min cursor-pointer p-0 font-medium underline underline-offset-1"
              >
                {copied ? '✓ Article Link Copied' : 'Copy Article Link'}
              </Button>
            </div>
          </div>
          <BlogTag
            displayAll
            post={post}
            position="start"
            displayReadTime
            readTimeClassName="hidden text-sm lg:block"
          />
        </div>
        <h1 className="text-lg font-semibold md:text-2xl lg:text-4xl">{post.title}</h1>
        <hr className="relative mt-4 h-px min-w-fit border-t border-white/20 md:mt-6 lg:mt-12" />
      </div>
    </section>
  )
}
