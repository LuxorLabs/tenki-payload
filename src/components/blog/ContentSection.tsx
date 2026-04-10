import { RichText } from './RichText'
import { ContentSidebar } from './ContentSidebar'
import { extractHeadingsFromLexical } from '@/utils/extract-headings'
import type { Post, Author, Media } from '@/payload-types'
import { SectionDivider } from '@/components/dashed-section-divider'

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
    <>
      <section
        className="grid-cols-1 grid lg:grid-cols-3 border-x border-bluish-gray-600 mx-auto max-w-[calc(100%-32px)] xl:max-w-[1080px]
      2xl:max-w-[1200px] "
      >
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
        <section
          id="blog-post"
          className="h-full py-0 lg:col-span-2 lg:p-8 p-4 lg:border-l border-bluish-gray-600"
        >
          <RichText content={post.content} />
        </section>
      </section>
      <SectionDivider />
    </>
  )
}
