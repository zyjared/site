function flink(p?: string): string {
  if (!p)
    return ''
  const link = p.startsWith('/') ? p : `/${p}`
  return link.endsWith('/') ? link.slice(0, -1) : link
}

export function normalizeLink(...paths: string[]): string {
  return paths.map(flink).filter(Boolean).join('')
}

export function normalizeBase(...paths: string[]): string {
  return `${normalizeLink(...paths)}/`
}

export function getLastSlug(url: string): string {
  return url ? url.replace(/\/$/, '').split('/').pop() || url : ''
}
