/**
 * Converts markdown-like content strings to Payload CMS Lexical editor JSON format.
 *
 * This is a lightweight converter that handles the subset of markdown used in the
 * blog seed data: headings, paragraphs, bold, inline code, code blocks, lists, links,
 * and tables. It produces the Lexical JSON structure expected by Payload's richtext-lexical.
 */

type LexicalNode = {
  type: string
  version: number
  [key: string]: unknown
}

let blockIdCounter = 0
function nextBlockId(): string {
  return `seed-block-${++blockIdCounter}`
}

type TextNode = {
  type: 'text'
  version: 1
  text: string
  format: number // 0=normal, 1=bold, 16=code, 2=italic
  detail: number
  mode: string
  style: string
}

type LinkNode = {
  type: 'link'
  version: 1
  children: LexicalNode[]
  direction: 'ltr' | null
  format: string
  indent: number
  fields: {
    linkType: 'custom'
    url: string
    newTab: boolean
  }
}

type ParagraphNode = {
  type: 'paragraph'
  version: 1
  children: LexicalNode[]
  direction: 'ltr' | null
  format: string
  indent: number
  textFormat: number
  textStyle: string
}

type HeadingNode = {
  type: 'heading'
  version: 1
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: LexicalNode[]
  direction: 'ltr' | null
  format: string
  indent: number
}

type ListNode = {
  type: 'list'
  version: 1
  listType: 'bullet' | 'number'
  tag: 'ul' | 'ol'
  start: number
  children: LexicalNode[]
  direction: 'ltr' | null
  format: string
  indent: number
}

type ListItemNode = {
  type: 'listitem'
  version: 1
  value: number
  children: LexicalNode[]
  direction: 'ltr' | null
  format: string
  indent: number
}

// ─── Inline text parser ─────────────────────────────────────────────────────

function parseInlineText(text: string): LexicalNode[] {
  const nodes: LexicalNode[] = []

  // Regex to match bold (**text**), inline code (`text`), and links ([text](url))
  const inlineRegex = /(\*\*(.+?)\*\*)|(`([^`]+?)`)|(\[([^\]]+?)\]\(([^)]+?)\))/g

  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = inlineRegex.exec(text)) !== null) {
    // Add plain text before this match
    if (match.index > lastIndex) {
      const plainText = text.slice(lastIndex, match.index)
      if (plainText) {
        nodes.push(makeTextNode(plainText, 0))
      }
    }

    if (match[2]) {
      // Bold text
      nodes.push(makeTextNode(match[2], 1))
    } else if (match[4]) {
      // Inline code
      nodes.push(makeTextNode(match[4], 16))
    } else if (match[6] && match[7]) {
      // Link
      nodes.push(makeLinkNode(match[6], match[7]))
    }

    lastIndex = match.index + match[0].length
  }

  // Add remaining plain text
  if (lastIndex < text.length) {
    const remaining = text.slice(lastIndex)
    if (remaining) {
      nodes.push(makeTextNode(remaining, 0))
    }
  }

  // If nothing was parsed, return the whole text as a single node
  if (nodes.length === 0 && text.length > 0) {
    nodes.push(makeTextNode(text, 0))
  }

  return nodes
}

function makeTextNode(text: string, format: number): TextNode {
  return {
    type: 'text',
    version: 1,
    text,
    format,
    detail: 0,
    mode: 'normal',
    style: '',
  }
}

function makeLinkNode(text: string, url: string): LinkNode {
  return {
    type: 'link',
    version: 1,
    children: [makeTextNode(text, 0)],
    direction: 'ltr',
    format: '',
    indent: 0,
    fields: {
      linkType: 'custom',
      url,
      newTab: true,
    },
  }
}

// ─── Block-level parser ─────────────────────────────────────────────────────

function parseListItems(lines: string[]): ListItemNode[] {
  return lines.map((line, index) => {
    const content = line.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '')
    return {
      type: 'listitem' as const,
      version: 1 as const,
      value: index + 1,
      children: parseInlineText(content),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
    }
  })
}

export function markdownToLexical(markdown: string): {
  root: {
    type: string
    version: number
    children: LexicalNode[]
    direction: 'ltr' | null
    format: string
    indent: number
  }
} {
  const lines = markdown.split('\n')
  const children: LexicalNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === '') {
      i++
      continue
    }

    // Code block (fenced)
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```

      // Map markdown language hints to valid CodeBlock language values
      const langMap: Record<string, string> = { json: 'javascript', sh: 'shell', bash: 'shell' }
      const resolvedLang = langMap[lang] || lang || 'plaintext'

      children.push({
        type: 'block',
        version: 1,
        format: '',
        fields: {
          id: nextBlockId(),
          blockName: '',
          blockType: 'Code',
          code: codeLines.join('\n'),
          language: resolvedLang,
        },
      })
      continue
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const tag = `h${level}` as HeadingNode['tag']
      children.push({
        type: 'heading',
        version: 1,
        tag,
        children: parseInlineText(headingMatch[2]),
        direction: 'ltr',
        format: '',
        indent: 0,
      })
      i++
      continue
    }

    // Table (lines starting with |)
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        // Skip separator rows (|---|---|)
        if (!lines[i].match(/^\|[\s-:|]+\|$/)) {
          tableLines.push(lines[i])
        }
        i++
      }

      if (tableLines.length > 0) {
        const rows = tableLines.map((tl) => {
          const cells = tl
            .split('|')
            .filter((c) => c.trim() !== '')
            .map((c) => c.trim())
          return cells
        })

        // Build table as a series of paragraphs (Lexical table feature is experimental)
        // For now, render as formatted text
        for (const row of rows) {
          children.push({
            type: 'paragraph',
            version: 1,
            children: parseInlineText(row.join(' | ')),
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            textStyle: '',
          })
        }
      }
      continue
    }

    // Unordered list
    if (line.match(/^[-*]\s+/)) {
      const listLines: string[] = []
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        listLines.push(lines[i])
        i++
      }
      children.push({
        type: 'list',
        version: 1,
        listType: 'bullet',
        tag: 'ul',
        start: 1,
        children: parseListItems(listLines),
        direction: 'ltr',
        format: '',
        indent: 0,
      })
      continue
    }

    // Ordered list
    if (line.match(/^\d+\.\s+/)) {
      const listLines: string[] = []
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        listLines.push(lines[i])
        i++
      }
      children.push({
        type: 'list',
        version: 1,
        listType: 'number',
        tag: 'ol',
        start: 1,
        children: parseListItems(listLines),
        direction: 'ltr',
        format: '',
        indent: 0,
      })
      continue
    }

    // Horizontal rule
    if (line.trim().match(/^[-*_]{3,}$/)) {
      children.push({
        type: 'horizontalrule',
        version: 1,
      })
      i++
      continue
    }

    // Default: paragraph (may span multiple lines until empty line)
    const paraLines: string[] = [line]
    i++
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].match(/^[-*]\s+/) &&
      !lines[i].match(/^\d+\.\s+/) &&
      !lines[i].trim().startsWith('|') &&
      !lines[i].trim().match(/^[-*_]{3,}$/)
    ) {
      paraLines.push(lines[i])
      i++
    }

    const paraText = paraLines.join('\n')
    children.push({
      type: 'paragraph',
      version: 1,
      children: parseInlineText(paraText),
      direction: 'ltr',
      format: '',
      indent: 0,
      textFormat: 0,
      textStyle: '',
    })
  }

  return {
    root: {
      type: 'root',
      version: 1,
      children,
      direction: 'ltr',
      format: '',
      indent: 0,
    },
  }
}
