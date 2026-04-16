import type { Post, Tag } from '@/payload-types'

type BlogPostTagsProps = {
  post: Post
}

export const BlogPostTags = ({ post }: BlogPostTagsProps) => {
  const tags = post.tags

  if (!tags || tags.length === 0) return null

  return (
    <div className="flex flex-col gap-4 items-start justify-center border-x border-b border-bluish-gray-600 p-4">
      <p className="text-sm text-static-secondary">Tags</p>
      <div className="flex flex-wrap gap-2">
        {(tags as Tag[]).map((tag) => {
          const tagData = typeof tag === 'number' ? null : tag
          if (!tagData?.slug) return null
          return (
            <span key={tagData.id} className="text-sm text-static-secondary">
              #{tagData.slug}
            </span>
          )
        })}
      </div>
    </div>
  )
}
