import { RelatedNewsCard } from './RelatedNewsCard'
import type { Post } from '@/payload-types'

type RelatedNewsProps = {
  posts: Post[]
  selectedPost: Post
}

export const RelatedNews = ({ posts, selectedPost }: RelatedNewsProps) => {
  const relatedPosts = posts.filter((post) => post.id !== selectedPost.id).slice(0, 3)
  if (relatedPosts.length === 0) return null

  return (
    <section className="mx-auto max-w-[calc(100%-32px)] xl:max-w-270 2xl:max-w-300 border-x border-bluish-gray-600">
      <div className={'p-4 lg:p-8 border-bluish-gray-600 border-b'}>
        <p className={'text-xs lg:text-sm text-blue-150 uppercase font-geist-mono'}>
          Recommended for you{' '}
        </p>
        <p className={'text-static-primary text-2xl lg:text-[30px] font-semibold'}>
          What's next in your stack.
        </p>
      </div>
      <div>
        <div className="p-4 lg:p-8 grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {relatedPosts.map((post, idx) => (
            <RelatedNewsCard
              key={`related-news-${idx}`}
              post={post}
              className={idx === 2 ? 'hidden xl:block' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
