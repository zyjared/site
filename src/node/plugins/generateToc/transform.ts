export interface Toc {
  title: string
  href?: string
  children?: Toc[]
}

export function transform(toc: Toc, level = 1) {
  return [
    genTitle(toc.title, level),
    genUlText(toc.children, level + 1),
  ].join('\n\n')
}

function genTitle(title: string, level = 1) {
  return `${'#'.repeat(level)} ${title}`
}

function genUlText(tocs: Toc[], level = 1) {
  return ul(tocs, level).join('\n')
}

function ul(tocs?: Toc[], level = 1): string[] {
  if (!tocs?.length)
    return []

  const lis = []
  for (const toc of tocs) {
    lis.push(
      li(toc.href
        ? a(toc.href, toc.title)
        : toc.title, level),
    )

    if (toc.children?.length) {
      lis.push(...ul(toc.children, level + 1))
    }
  }
  return lis
}

function li(content: string, level = 1) {
  return `${'  '.repeat(level - 1)}- ${content}`
}

function a(href: string, content: string) {
  return `[${content}](${href})`
}
