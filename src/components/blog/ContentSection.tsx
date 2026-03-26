import { RichText } from './RichText'
import { ContentSidebar } from './ContentSidebar'
import { extractHeadingsFromLexical } from '@/utils/extract-headings'
import type { Post, Author, Media } from '@/payload-types'

type ContentProps = {
  post: Post
}

export const ContentSection = ({ post }: ContentProps) => {
  if (!post.content) {
    return null
  }

  const author = typeof post.author === 'number' ? null : (post.author as Author)
  if (!author) {
    return null
  }

  const authorAvatar = author.avatar as Media
  const headings = extractHeadingsFromLexical(post.content)

  return (
    <section className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-0 px-6 md:px-12 lg:grid-cols-3 lg:gap-[60px] xl:px-0">
      <ContentSidebar
        headings={headings}
        excerpt={post.excerpt}
        title={post.title}
        author={{
          name: author.name,
          bio: author.bio,
          avatarUrl: authorAvatar?.url || null,
          twitter: author.socialLinks?.twitter || null,
        }}
      />
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
