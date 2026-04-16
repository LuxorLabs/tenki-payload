import { cn } from '@/lib/utils'
import type { Post, Category } from '@/payload-types'

type BlogTagProps = {
  displayAll?: boolean
  displayReadTime?: boolean
  position?: 'start' | 'end'
  readTimeClassName?: string
  post: Post
}

export const BlogTag = ({
  displayAll,
  post,
  displayReadTime,
  position = 'end',
  readTimeClassName,
}: BlogTagProps) => {
  const category = typeof post.category === 'number' ? null : (post.category as Category)
  const categoryName = category?.name

  const readTime =
    displayReadTime && post.readingTime ? (
      <span className={cn('text-static-secondary text-sm', readTimeClassName)}>
        {post.readingTime} min read
      </span>
    ) : null

  return categoryName ? (
    <div className="flex flex-wrap items-center gap-2 md:gap-6">
      {position === 'start' && readTime}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-geist-mono text-blue-150 text-sm uppercase leading-none tracking-[1.96px]">
          {categoryName}
        </span>
      </div>
      {position === 'end' && readTime}
    </div>
  ) : null
}
