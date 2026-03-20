'use client'

import Link from 'next/link'
import { CheckIcon, LinkIcon, RedditLogoIcon, XLogoIcon } from '@phosphor-icons/react'
import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import LinkedinWhiteLogo from '@/assets/svg/linkedin-white-logo.svg'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { RichText } from './RichText'
import { extractHeadingsFromLexical } from '@/utils/extract-headings'
import { useActiveSection } from '@/utils/hooks/use-active-section'
import type { Post, Author, Media } from '@/payload-types'

type ContentProps = {
  post: Post
}

export const ContentSection = ({ post }: ContentProps) => {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  // Extract headings - hooks must be called before any conditional returns
  const headings = useMemo(() => {
    if (!post.content) return []
    return extractHeadingsFromLexical(post.content)
  }, [post.content])
  const headingIds = useMemo(() => headings.map((h) => h.id), [headings])
  const activeId = useActiveSection(headingIds)

  // Check for required data after all hooks
  if (!post.content) {
    return null
  }

  const author = typeof post.author === 'number' ? null : (post.author as Author)
  if (!author) {
    return null
  }

  const authorAvatar = author.avatar as Media

  return (
    <section className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-0 px-6 md:px-12 lg:grid-cols-3 lg:gap-[60px] xl:px-0">
      <section className="order-last py-0 lg:order-first lg:py-8">
        <div className="lg:animate-fade-in">
          {post.excerpt && (
            <div className="mb-6 hidden rounded-lg border border-[#36404c] bg-[#1d232a] p-4 lg:block">
              <span className="text-sm font-bold">TL;DR</span>
              <p className="text-sm">{post.excerpt}</p>
            </div>
          )}
          {headings.length > 0 && (
            <div className="mt-6 hidden lg:block">
              <h3 className="text-static-secondary text-sm">Table of contents</h3>
              <hr className="relative mt-2 h-px min-w-fit border-t border-white/20" />
              <ul className="space-y-2 text-sm text-white">
                {headings.map((heading) => (
                  <li
                    key={heading.id}
                    className={cn('mt-2.5', {
                      'ml-0': heading.level === 1,
                      'ml-4': heading.level === 2,
                      'ml-8': heading.level === 3,
                      'ml-12': heading.level === 4,
                    })}
                  >
                    <Link
                      href={`#${heading.id}`}
                      className={cn(
                        'transition-colors duration-200 hover:text-white/80',
                        activeId === heading.id && 'font-bold text-white',
                      )}
                    >
                      {heading.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6">
            <h3 className="text-static-secondary text-sm">Author</h3>
            <hr className="relative mt-2 h-px min-w-fit border-t border-white/20" />
            <div className="mt-2.5 flex items-center gap-2">
              <div className="relative size-9">
                <Image
                  src={
                    authorAvatar?.url
                      ? authorAvatar.url.startsWith('http')
                        ? authorAvatar.url
                        : authorAvatar.url
                      : '/blog/images/favicon-default.png'
                  }
                  fill
                  alt={author.name}
                  className="full rounded-full border border-gray-600"
                  style={{ borderRadius: '6px' }}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-md font-medium">
                  <span>{author.name}</span>
                  {author.socialLinks?.twitter && (
                    <Link
                      href={`https://x.com/${author.socialLinks.twitter}`}
                      target="_blank"
                      className="ml-2 inline-block"
                    >
                      <XLogoIcon size={12} />
                    </Link>
                  )}
                </div>
                {author.bio && <div className="text-xs">{author.bio}</div>}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-static-secondary text-sm">Share</h3>
            <hr className="relative mt-2 h-px min-w-fit border-t border-white/20" />
            <div className="mt-2.5 flex gap-2">
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(currentUrl).then(() => {
                    setCopied(true)
                    setTimeout(() => setCopied(false), 3000)
                  })
                }}
                className="hover:border-static-secondary cursor-pointer"
                variant="secondary"
                size="icon"
              >
                {copied ? <CheckIcon size={20} /> : <LinkIcon size={20} />}
              </Button>
              <Link
                href={`https://x.com/compose/post?text=${currentUrl}`}
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                    size: 'icon',
                  }),
                  'hover:border-static-secondary',
                )}
              >
                <XLogoIcon size={20} />
              </Link>
              <Link
                href={`https://www.reddit.com/submit?url=${currentUrl}&title=${post.title}`}
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                    size: 'icon',
                  }),
                  'hover:border-static-secondary',
                )}
              >
                <RedditLogoIcon weight="fill" size={20} />
              </Link>
              <Link
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post?.title ?? 'Tenki Cloud')}`}
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: 'secondary',
                    size: 'icon',
                  }),
                  'hover:border-static-secondary',
                )}
              >
                <LinkedinWhiteLogo />
              </Link>
            </div>
          </div>
        </div>
      </section>
      {post.excerpt && (
        <div className="mt-6 rounded-lg border border-[#36404c] bg-[#1d232a] p-4 lg:hidden">
          <span className="text-sm font-bold">TL;DR</span>
          <p className="text-sm">{post.excerpt}</p>
        </div>
      )}

      <section id="blog-post" className="h-full py-0 lg:col-span-2 lg:py-3">
        <RichText content={post.content} />
      </section>
    </section>
  )
}
