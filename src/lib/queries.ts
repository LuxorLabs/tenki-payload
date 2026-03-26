import type { SelectType, PopulateType } from 'payload'

/** Fields needed when rendering a BlogCard (listing, category, tag, related posts) */
export const BLOG_CARD_SELECT = {
  title: true,
  slug: true,
  featuredImage: true,
  author: true,
  tags: true,
  publishedAt: true,
  readingTime: true,
  createdAt: true,
} satisfies SelectType

/** Fields to include from populated relationships in BlogCard context */
export const BLOG_CARD_POPULATE = {
  media: { url: true, filename: true, alt: true },
  authors: { name: true, avatar: true },
  tags: { name: true },
} satisfies PopulateType
