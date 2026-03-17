import type { CollectionConfig, Field, PayloadRequest } from 'payload'

interface CollectionDescriptor {
  slug: string
  lexicalFields: string[]
  titleField?: string
  slugField?: string
  requiredFields: string[]
  selectFieldOptions: Record<string, string[]>
  relationshipFields: Record<string, string | string[]>
  isMedia: boolean
}

function extractFieldInfo(
  fields: Field[],
  prefix = '',
): {
  lexical: string[]
  required: string[]
  selects: Record<string, string[]>
  relationships: Record<string, string | string[]>
  titleField?: string
  slugField?: string
} {
  const lexical: string[] = []
  const required: string[] = []
  const selects: Record<string, string[]> = {}
  const relationships: Record<string, string | string[]> = {}
  let titleField: string | undefined
  let slugField: string | undefined

  for (const field of fields) {
    // Skip UI-only fields
    if (field.type === 'ui' || field.type === 'row' || field.type === 'collapsible') {
      if ('fields' in field && Array.isArray(field.fields)) {
        const nested = extractFieldInfo(field.fields, prefix)
        lexical.push(...nested.lexical)
        required.push(...nested.required)
        Object.assign(selects, nested.selects)
        Object.assign(relationships, nested.relationships)
        if (nested.titleField) titleField = nested.titleField
        if (nested.slugField) slugField = nested.slugField
      }
      continue
    }

    if (!('name' in field)) continue

    const fullName = prefix ? `${prefix}.${field.name}` : field.name

    if ('required' in field && field.required) {
      required.push(fullName)
    }

    switch (field.type) {
      case 'richText':
        lexical.push(fullName)
        break

      case 'select':
        if (field.options && Array.isArray(field.options)) {
          selects[fullName] = field.options.map((opt) =>
            typeof opt === 'string' ? opt : opt.value,
          )
        }
        break

      case 'relationship':
      case 'upload':
        if ('relationTo' in field && field.relationTo) {
          relationships[fullName] = field.relationTo
        }
        break

      case 'group':
        if (field.fields) {
          const nested = extractFieldInfo(field.fields, fullName)
          lexical.push(...nested.lexical)
          required.push(...nested.required)
          Object.assign(selects, nested.selects)
          Object.assign(relationships, nested.relationships)
        }
        break

      case 'array':
      case 'blocks':
        // Skip deep nesting for arrays/blocks — agent can inspect documents for these
        break
    }

    if (field.name === 'title') titleField = fullName
    if (field.name === 'slug') slugField = fullName
  }

  return { lexical, required, selects, relationships, titleField, slugField }
}

function describeCollection(collection: CollectionConfig): CollectionDescriptor {
  const isMedia = !!collection.upload
  const info = extractFieldInfo(collection.fields)

  return {
    slug: collection.slug,
    lexicalFields: info.lexical,
    ...(info.titleField && { titleField: info.titleField }),
    ...(info.slugField && { slugField: info.slugField }),
    requiredFields: info.required,
    selectFieldOptions: info.selects,
    relationshipFields: info.relationships,
    isMedia,
  }
}

export async function editorialDiscoveryHandler(req: PayloadRequest): Promise<Response> {
  if (!req.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const collections = req.payload.config.collections.map(describeCollection)
  const mediaCollections = collections.filter((c) => c.isMedia).map((c) => c.slug)

  return Response.json({
    collections,
    globals: [],
    mediaCollections,
  })
}
