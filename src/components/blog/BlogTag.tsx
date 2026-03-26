import { cn } from '@/lib/utils'
import type { Post, Tag } from '@/payload-types'

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
  const tags = post?.tags

  const readTime = displayReadTime && post.readingTime ? (
    <span className={cn('text-static-secondary text-sm', readTimeClassName)}>{post.readingTime} min read</span>
  ) : null

  return tags ? (
    <div className="flex flex-wrap items-center gap-2 md:gap-6">
      {position === 'start' && readTime}
      <div className="flex flex-wrap items-center gap-2">
        {(tags as Tag[]).map((tag, idx) => {
          if (idx > 1 && !displayAll) return null

          const tagData = typeof tag === 'number' ? null : tag
          const tagName = tagData?.name

          return tagName ? (
            <span
              key={`${tagName}-${idx}`}
              className={cn(
                'bg-badge-rest border-badge-rest-border text-static-secondary flex h-7 items-center rounded-md border px-2 py-1 text-sm',
              )}
            >
              {tagName}
            </span>
          ) : null
        })}
        {!displayAll && tags.length > 2 && (
          <span
            className={cn(
              'bg-badge-rest border-badge-rest-border text-static-secondary flex h-7 items-center rounded-md border px-2 py-1 text-sm',
            )}
          >
            {`+${tags.length - 2}`}
          </span>
        )}
        {position === 'end' && readTime}
      </div>
    </div>
  ) : null
}
