import { addItemBeforeEachLine, isEqual } from '../utils'

export interface HTMLNode {
  tag?: string
  children?: HTMLNode[]
  attrs?: Record<string, string>
  content?: string
  selfClose?: boolean
}

const selfCloseTags = new Set(['br', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])

export function isSelfCloseTag(tag: string) {
  return selfCloseTags.has(tag)
}

function parseAttributes(attributeString: string): Record<string, string> {
  const attrRegex = /([a-z\-]+)="([^"]*)"/g
  const attributes: Record<string, string> = {}
  let match = attrRegex.exec(attributeString)
  while (match !== null) {
    attributes[match[1]] = match[2]
    match = attrRegex.exec(attributeString)
  }
  return attributes
}

export function parseHTML(html: string): HTMLNode[] {
  // eslint-disable-next-line regexp/optimal-quantifier-concatenation, regexp/no-super-linear-backtracking
  const tagRegex = /<([a-z0-9]+)([^>]*)\/?>|<\/([a-z0-9]+)>/g

  const nodes: HTMLNode[] = []
  const stack: HTMLNode[] = []

  let lastIndex = 0

  let match = tagRegex.exec(html)
  while (match !== null) {
    if (match.index > lastIndex) {
      const text = html.slice(lastIndex, match.index).trim()
      if (text && stack.length > 0) {
        stack[stack.length - 1].children!.push({
          tag: '',
          attrs: {},
          children: [],
          content: text,
          selfClose: false,
        })
      }
    }
    lastIndex = tagRegex.lastIndex

    if (match[1]) {
      const tagName = match[1]
      const attributes = parseAttributes(match[2] || '')
      const selfClose = match[0].endsWith('/>')
      const node: HTMLNode = {
        tag: tagName,
        attrs: attributes,
        children: [],
        selfClose,
      }

      if (stack.length === 0) {
        nodes.push(node)
      }
      else {
        stack[stack.length - 1].children!.push(node)
      }

      if (!selfClose) {
        stack.push(node)
      }
    }
    else if (match[3]) {
      const closingTag = match[3]

      while (stack.length > 0) {
        const node = stack.pop()
        if (node && node.tag === closingTag) {
          break
        }
      }
    }

    match = tagRegex.exec(html)
  }

  return nodes
}

export function stringifyHTML(nodes: HTMLNode[]): string {
  function nodeToString(node: HTMLNode): string {
    if (node.selfClose) {
      const attrs = Object.entries(node.attrs || {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ')
      return `<${node.tag}${attrs ? ` ${attrs}` : ''} />`
    }

    if (!node.tag && node.content) {
      return node.content
    }

    const attrs = Object.entries(node.attrs || {})
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')

    const children = node.children && node.children.map(child => nodeToString(child)).join('')
    const content = node.content || ''

    return `<${node.tag}${attrs ? ` ${attrs}` : ''}>${content}${children}</${node.tag}>`
  }

  return addItemBeforeEachLine(nodes.map(nodeToString).join('\n'), '  ')
}

// ==============================================================================

export function parseHTMLHead(html: string) {
  const textHead = (html.match(/<head>([\s\S]*?)<\/head>/) || [])[1]
  return textHead ? parseHTML(textHead) : []
}

export function parseHTMLBody(html: string) {
  const textBody = (html.match(/<body>([\s\S]*?)<\/body>/) || [])[1]
  return textBody ? parseHTML(textBody) : []
}

function stringifyHTMLHead(nodes: HTMLNode[]) {
  const titleNode = nodes.findLast(node => node.tag === 'title') || { tag: 'title', children: [{ content: '' }] }
  nodes = nodes.filter(node => node.tag !== 'title')
  nodes.push(titleNode)

  return `<head>\n${stringifyHTML(nodes)}\n</head>`
}

function stringifyHTMLBody(nodes: HTMLNode[], attributes: Record<string, string> = {}) {
  const attrs = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ')
  return attrs ? `<body ${attrs}>\n${stringifyHTML(nodes)}\n</body>` : `<body>\n${stringifyHTML(nodes)}\n</body>`
}

export function stringifyHTMLDocument(headNodes: HTMLNode[], bodyNodes: HTMLNode[] | { nodes: HTMLNode[], attributes: Record<string, string> }, lang: 'zh-CN' | string = 'zh-CN') {
  const html = Array.isArray(bodyNodes)
    ? `${stringifyHTMLHead(headNodes)}\n${stringifyHTMLBody(bodyNodes)}`
    : `${stringifyHTMLHead(headNodes)}\n${stringifyHTMLBody(bodyNodes.nodes, bodyNodes.attributes)}`

  return `<!DOCTYPE html>\n<html lang="${lang}">\n${html}\n</html>`
}
