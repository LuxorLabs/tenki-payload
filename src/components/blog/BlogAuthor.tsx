import { format } from 'date-fns'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Author, Media } from '@/payload-types'

type BlogAuthorProps = {
  author: number | Author
  datePublished: string
}

export const BlogAuthor = ({ author, datePublished }: BlogAuthorProps) => {
  // Handle case where author might be just an ID
  if (typeof author === 'number') {
    return (
      <div className="text-static-primary flex items-center gap-1 text-sm">
        <span>Author #{author}</span>
        <span className="size-0.5 bg-white" />
        <span>{format(new Date(datePublished), 'MMM dd, yyyy')}</span>
      </div>
    )
  }

  // Get author avatar URL
  let avatarUrl = '/blog/images/favicon-default.png'
  if (author.avatar) {
    const avatar = typeof author.avatar === 'number' ? null : (author.avatar as Media)
    if (avatar?.url) {
      avatarUrl = avatar.url.startsWith('http') ? avatar.url : avatar.url
    }
  }

  return (
    <div className="text-static-primary flex min-w-0 items-center gap-1 text-sm">
      <div className="relative size-5 shrink-0">
        <Image
          src={avatarUrl}
          fill
          alt={author.name}
          className="border-static-profile size-5 rounded-full border"
        />
      </div>
      <span className="shrink-0 whitespace-nowrap">{author.name}</span>
      <span className="size-0.5 shrink-0 bg-white" />
      <span className="shrink-0 whitespace-nowrap">
        {format(new Date(datePublished), 'MMM dd, yyyy')}
      </span>
    </div>
  )
}
