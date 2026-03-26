import type { CollectionConfig } from 'payload'
import { revalidatePath } from 'next/cache'
import { lexicalEditor, EXPERIMENTAL_TableFeature, BlocksFeature } from '@payloadcms/richtext-lexical'
import { CodeBlock } from '@payloadcms/richtext-lexical'

function extractText(node: any): string {
  if (node.text) return node.text
  if (node.children) return node.children.map(extractText).join(' ')
  return ''
}

function computeReadingTime(content: any): number {
  if (!content?.root?.children) return 0
  const text = content.root.children.map(extractText).join(' ')
  const words = text.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category', 'status', 'publishedAt'],
    preview: (doc) => {
      if (doc?.slug) {
        // Return relative URL - Payload automatically constructs absolute URL from browser
        return `/${doc.slug}`
      }
      return null
    },
  },
  access: {
    read: ({ req: { user } }) => {
      // Require authentication (session or API key) to read posts
      return !!user
    },
    create: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'super-admin') return true
      return ['admin', 'marketing', 'product'].includes(user.role)
    },
    update: ({ req: { user } }) => {
      if (!user) return false
      if (user.role === 'super-admin') return true
      return ['admin', 'marketing', 'product'].includes(user.role)
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return user.role === 'super-admin' || user.role === 'admin'
    },
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.content) {
          data.readingTime = computeReadingTime(data.content)
        }
        return data
      },
    ],
    afterChange: [
      ({ doc }) => {
        if (doc.status === 'published' && doc.slug) {
          revalidatePath(`/${doc.slug}`)
          revalidatePath('/')
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        if (doc.slug) {
          revalidatePath(`/${doc.slug}`)
          revalidatePath('/')
        }
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 3000, // Autosave every 3 seconds
      },
    },
    maxPerDoc: 50,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly version of the title',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Brief summary for listings and social sharing (max 300 chars)',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          EXPERIMENTAL_TableFeature(),
          BlocksFeature({
            blocks: [CodeBlock()],
          }),
        ],
      }),
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main image for the post (recommended: 1200x630px)',
      },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'authors',
      required: true,
      hasMany: false,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      hasMany: false,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'When this post should be published',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Estimated reading time in minutes (auto-calculated if left empty)',
      },
    },
    // SEO Fields
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          maxLength: 60,
          admin: {
            description: 'Custom meta title (max 60 chars). Defaults to post title if empty.',
            placeholder: 'Override the default title for search engines',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          maxLength: 160,
          admin: {
            description: 'Custom meta description (max 160 chars). Defaults to excerpt if empty.',
            placeholder: 'Override the default description for search engines',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Custom Open Graph image (1200x630px). Defaults to featured image if empty.',
          },
        },
        {
          name: 'canonicalURL',
          type: 'text',
          admin: {
            description: 'Canonical URL if this content was originally published elsewhere',
            placeholder: 'https://example.com/original-post',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Prevent search engines from indexing this post',
          },
        },
        {
          name: 'keywords',
          type: 'array',
          fields: [
            {
              name: 'keyword',
              type: 'text',
            },
          ],
          admin: {
            description: 'Target keywords for SEO',
          },
        },
      ],
    },
  ],
}
