'use client'

import { useEffect, useState } from 'react'
import { BlogAuthor } from './BlogAuthor'
import { BlogTag } from './BlogTag'
import type { Post, Media } from '@/payload-types'
import { format } from 'date-fns'
import { CheckIcon, LinkIcon, RedditLogoIcon, XLogoIcon } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import LinkedinWhiteLogo from '@/assets/svg/linkedin-white-logo.svg'

type BlogMetaProps = {
  post: Post
}

export const BlogMeta = ({ post }: BlogMetaProps) => {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    })
  }

  return (
    <section className=" mx-auto max-w-[calc(100%-32px)] xl:max-w-[1080px] 2xl:max-w-[1200px] pt-28 border-x border-b border-bluish-gray-600">
      <div className="p-4 md:px-4 md:py-8 lg:p-8 flex flex-col lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className={'flex items-center gap-2'}>
            <BlogTag post={post} position="start" />
            <div className="size-0.5 bg-static-secondary" />
            <span className={'text-sm text-static-secondary'}>
              {format(new Date(post.publishedAt || post.createdAt), 'MMM yyyy')}
            </span>
          </div>

          <h1 className="text-lg font-semibold md:text-2xl lg:text-[30px] py-3">{post.title}</h1>
          {(post.publishedAt || post.createdAt) && post.author && (
            <BlogAuthor
              author={post.author}
              authorNameClassName={'text-static-primary'}
              showDate={false}
            />
          )}
        </div>

        <div className={'mt-6 lg:mt-0'}>
          <p className={'text-static-secondary text-sm lg:text-sm'}>Share Article:</p>
          <div className="flex gap-1 mt-1">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(currentUrl).then(() => {
                  setCopied(true)
                  setTimeout(() => setCopied(false), 3000)
                })
              }}
              className="hover:border-static-secondary cursor-pointer"
              variant="outline"
              size="icon"
            >
              {copied ? <CheckIcon size={20} /> : <LinkIcon size={20} />}
            </Button>
            <Link
              href={`https://x.com/compose/post?text=${currentUrl}`}
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: 'outline',
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
                  variant: 'outline',
                  size: 'icon',
                }),
                'hover:border-static-secondary',
              )}
            >
              <RedditLogoIcon weight="fill" size={20} />
            </Link>
            <Link
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: 'outline',
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
  )
}
