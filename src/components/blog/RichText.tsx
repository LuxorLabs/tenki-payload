import React from 'react'

interface RichTextProps {
  content: any
}

function extractTextFromNode(node: any): string {
  if (!node) return ''

  if (Array.isArray(node)) {
    return node.map((child) => extractTextFromNode(child)).join('')
  }

  if (node.type === 'text') {
    return node.text || ''
  }

  if (node.children) {
    return extractTextFromNode(node.children)
  }

  return ''
}

function serializeLexical(node: any): React.ReactNode {
  if (!node) return null

  // Handle root node
  if (node.root) {
    return serializeLexical(node.root)
  }

  // Handle array of children
  if (Array.isArray(node)) {
    return node.map((child, i) => <React.Fragment key={i}>{serializeLexical(child)}</React.Fragment>)
  }

  // Handle block nodes without children (like code blocks)
  if (node.type === 'block') {
    if (node.fields?.blockType === 'Code') {
      const code = node.fields?.code || ''
      const language = node.fields?.language || ''
      return (
        <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <code className={language ? `language-${language}` : ''}>{code}</code>
        </pre>
      )
    }
    return null
  }

  // Handle children array
  if (node.children) {
    const children = serializeLexical(node.children)

    // Render based on node type
    switch (node.type) {
      case 'root':
        return <div>{children}</div>
      case 'paragraph':
        return <p>{children}</p>
      case 'heading':
        const HeadingTag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        // Generate ID from heading text
        const headingText = extractTextFromNode(node)
        const headingId = headingText
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]/g, '')
        return (
          <HeadingTag id={headingId} className="scroll-mt-30">
            {children}
          </HeadingTag>
        )
      case 'list':
        return node.listType === 'number' ? <ol>{children}</ol> : <ul>{children}</ul>
      case 'listitem':
        return <li>{children}</li>
      case 'quote':
        return <blockquote>{children}</blockquote>
      case 'autolink':
      case 'link':
        const href = node.fields?.url ?? node.url ?? '#'
        const newTab = node.fields?.newTab ?? node.newTab
        return (
          <a href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined}>
            {children}
          </a>
        )
      case 'code':
        return (
          <pre>
            <code className={node.language ? `language-${node.language}` : ''}>
              {children}
            </code>
          </pre>
        )
      case 'table':
        return (
          <table>
            <tbody>{children}</tbody>
          </table>
        )
      case 'tablerow':
        return <tr>{children}</tr>
      case 'tablecell':
        return node.headerState ? <th>{children}</th> : <td>{children}</td>
      case 'horizontalrule':
        return <hr />
      case 'block':
        // This should not be reached since blocks are handled earlier
        return <div>{children}</div>
      default:
        return <div>{children}</div>
    }
  }

  // Handle text nodes
  if (node.type === 'text') {
    let text = <>{node.text}</>

    if (node.format & 1) {
      // Bold
      text = <strong>{text}</strong>
    }
    if (node.format & 2) {
      // Italic
      text = <em>{text}</em>
    }
    if (node.format & 4) {
      // Strikethrough
      text = <s>{text}</s>
    }
    if (node.format & 8) {
      // Underline
      text = <u>{text}</u>
    }
    if (node.format & 16) {
      // Code
      text = <code>{text}</code>
    }

    return text
  }

  // Handle line break - add vertical spacing to match paragraph margins
  if (node.type === 'linebreak') {
    return (
      <>
        <br />
        <span className="block h-4" />
      </>
    )
  }

  return null
}

export function RichText({ content }: RichTextProps) {
  if (!content) {
    return null
  }

  return (
    <div className="rich-text">
      {serializeLexical(content)}
    </div>
  )
}
