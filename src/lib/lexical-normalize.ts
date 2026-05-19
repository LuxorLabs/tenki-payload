// Normalize legacy / forward-versioned Lexical state so the admin editor can
// load posts authored on a newer richtext-lexical schema:
//   * adds `root.blockReferences = []` when missing
//   * coerces `upload.value` from the stub object form (`{id}` / `{id, alt}`)
//     back to its primitive ID — without touching fully populated Media docs
//     returned by `depth > 0` reads, so frontend image rendering is preserved.

const STUB_KEYS = new Set(['id', 'alt'])

const isUploadStub = (v: unknown): v is { id: number | string } => {
  if (!v || typeof v !== 'object') return false
  const keys = Object.keys(v as Record<string, unknown>)
  if (keys.length === 0) return false
  return keys.every((k) => STUB_KEYS.has(k)) && 'id' in (v as Record<string, unknown>)
}

const walk = (node: any): void => {
  if (!node || typeof node !== 'object') return
  if (node.type === 'upload' && isUploadStub(node.value)) {
    node.value = (node.value as { id: number | string }).id
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child)
  }
}

export function normalizeLexicalState<T extends { root?: any } | null | undefined>(
  value: T,
): T {
  if (!value || typeof value !== 'object' || !value.root) return value
  if (!Array.isArray(value.root.blockReferences)) {
    value.root.blockReferences = []
  }
  if (Array.isArray(value.root.children)) {
    for (const child of value.root.children) walk(child)
  }
  return value
}
