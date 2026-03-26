/**
 * Seed script for populating the Payload CMS database with production blog data.
 *
 * Usage:
 *   pnpm seed
 *
 * This script uses the Payload local API to create:
 *   1. Media (1x1 placeholder to satisfy Payload upload; images render from CDN)
 *   2. Authors (with avatar references)
 *   3. Categories
 *   4. Tags
 *   5. Posts (with all relationships, Lexical rich-text content, and SEO metadata)
 *
 * It is idempotent: running it twice will skip records that already exist
 * (matched by slug, email, or filename).
 */

import { getPayload } from 'payload'
import config from '../payload.config'
import { authors, categories, tags, featuredImages, posts } from './data'
import {
  markdownToLexical,
} from './markdown-to-lexical'

// ─── Helpers ────────────────────────────────────────────────────────────────

// 1x1 transparent PNG — satisfies Payload's upload requirement for media records.
// Actual images are served from the production R2 CDN via R2_PUBLIC_URL.
const PLACEHOLDER_PNG = Buffer.from(new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44,
  0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f,
  0x15, 0xc4, 0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x62, 0x00,
  0x00, 0x00, 0x02, 0x00, 0x01, 0xe2, 0x21, 0xbc, 0x33, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45,
  0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
]))

// ─── Main ───────────────────────────────────────────────────────────────────

async function seed() {
  const payload = await getPayload({ config })

  console.log('--- Starting seed ---\n')

  // ── 1. Seed Media (featured images + author avatars) ──────────────────

  console.log('Seeding media...')

  // Combine all images we need to seed
  const allImages = [
    ...featuredImages.map((img) => ({
      filename: img.filename,
      alt: img.alt,
      sourceUrl: img.sourceUrl,
    })),
    ...authors.map((a) => ({
      filename: a.avatar.filename,
      alt: a.avatar.alt,
      sourceUrl: a.avatar.sourceUrl,
    })),
  ]

  const mediaMap = new Map<string, number>() // filename -> media ID

  for (const img of allImages) {
    // Check if already exists
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: img.filename } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      mediaMap.set(img.filename, existing.docs[0].id)
      console.log(`  [skip] Media already exists: ${img.filename}`)
      continue
    }

    try {
      const file = {
        data: PLACEHOLDER_PNG,
        mimetype: 'image/png',
        name: img.filename,
        size: PLACEHOLDER_PNG.length,
      }

      const created = await payload.create({
        collection: 'media',
        data: {
          alt: img.alt,
          sourceUrl: img.sourceUrl,
        },
        file,
      })

      mediaMap.set(img.filename, created.id)
      console.log(`  [created] ${img.filename} (ID: ${created.id})`)
    } catch (err) {
      console.error(`  [error] Failed to seed media ${img.filename}:`, err)
    }
  }

  // ── 2. Seed Authors ───────────────────────────────────────────────────

  console.log('\nSeeding authors...')
  const authorMap = new Map<string, number>() // email -> author ID

  for (const author of authors) {
    const existing = await payload.find({
      collection: 'authors',
      where: { email: { equals: author.email } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      authorMap.set(author.email, existing.docs[0].id)
      console.log(`  [skip] Author already exists: ${author.name}`)
      continue
    }

    const avatarId = mediaMap.get(author.avatar.filename)

    const created = await payload.create({
      collection: 'authors',
      data: {
        name: author.name,
        email: author.email,
        role: author.role,
        socialLinks: author.socialLinks,
        ...(avatarId ? { avatar: avatarId } : {}),
      },
    })

    authorMap.set(author.email, created.id)
    console.log(`  [created] ${author.name} (ID: ${created.id})`)
  }

  // ── 3. Seed Categories ────────────────────────────────────────────────

  console.log('\nSeeding categories...')
  const categoryMap = new Map<string, number>() // slug -> category ID

  for (const cat of categories) {
    const existing = await payload.find({
      collection: 'categories',
      where: { slug: { equals: cat.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      categoryMap.set(cat.slug, existing.docs[0].id)
      console.log(`  [skip] Category already exists: ${cat.name}`)
      continue
    }

    const created = await payload.create({
      collection: 'categories',
      data: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      },
    })

    categoryMap.set(cat.slug, created.id)
    console.log(`  [created] ${cat.name} (ID: ${created.id})`)
  }

  // ── 4. Seed Tags ─────────────────────────────────────────────────────

  console.log('\nSeeding tags...')
  const tagMap = new Map<string, number>() // slug -> tag ID

  for (const tag of tags) {
    const existing = await payload.find({
      collection: 'tags',
      where: { slug: { equals: tag.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      tagMap.set(tag.slug, existing.docs[0].id)
      console.log(`  [skip] Tag already exists: ${tag.name}`)
      continue
    }

    const created = await payload.create({
      collection: 'tags',
      data: {
        name: tag.name,
        slug: tag.slug,
      },
    })

    tagMap.set(tag.slug, created.id)
    console.log(`  [created] ${tag.name} (ID: ${created.id})`)
  }

  // ── 5. Seed Posts ─────────────────────────────────────────────────────

  console.log('\nSeeding posts...')

  for (const post of posts) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  [skip] Post already exists: ${post.title}`)
      continue
    }

    const authorId = authorMap.get(post.authorEmail)
    const categoryId = categoryMap.get(post.categorySlug)
    const tagIds = post.tagSlugs
      .map((slug) => tagMap.get(slug))
      .filter((id): id is number => id !== undefined)

    const featuredImageFilename = featuredImages[post.featuredImageIndex]?.filename
    const featuredImageId = featuredImageFilename ? mediaMap.get(featuredImageFilename) : undefined

    if (!authorId) {
      console.error(`  [error] Author not found for ${post.title}: ${post.authorEmail}`)
      continue
    }
    if (!categoryId) {
      console.error(`  [error] Category not found for ${post.title}: ${post.categorySlug}`)
      continue
    }
    if (!featuredImageId) {
      console.error(`  [error] Featured image not found for ${post.title}`)
      continue
    }

    // Convert markdown content to Lexical JSON
    const lexicalContent = markdownToLexical(post.content)

    const created = await payload.create({
      collection: 'posts',
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        status: post.status,
        publishedAt: post.publishedAt,
        readingTime: post.readingTime,
        author: authorId,
        category: categoryId,
        tags: tagIds,
        featuredImage: featuredImageId,
        content: lexicalContent,
        seo: {
          metaTitle: post.seo.metaTitle || undefined,
          metaDescription: post.seo.metaDescription || undefined,
          noIndex: post.seo.noIndex,
          keywords: post.seo.keywords.map((kw) => ({ keyword: kw })),
        },
        _status: 'published',
      },
    })

    console.log(`  [created] ${post.title} (ID: ${created.id})`)
  }

  console.log('\n--- Seed complete ---')
  console.log(`  Media:      ${mediaMap.size} records`)
  console.log(`  Authors:    ${authorMap.size} records`)
  console.log(`  Categories: ${categoryMap.size} records`)
  console.log(`  Tags:       ${tagMap.size} records`)
  console.log(`  Posts:      ${posts.length} records`)

  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
