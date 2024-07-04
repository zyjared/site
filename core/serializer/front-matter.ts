import yaml from 'js-yaml'
import { type HTMLNode, isSelfCloseTag } from './html'

interface Meta {
  name: string
  content: string
}

interface FrontMatter {
  title?: string
  meta?: Meta[]
  lang?: string
}

export function frontMatterToYaml(text: string) {
  return yaml.load(text) as FrontMatter
}

export function frontMatterToHeadNodes(frontMatter: FrontMatter): HTMLNode[] {
  const titleNode = { tag: 'title', children: [{ content: frontMatter.title }] }
  const metaNodes = frontMatter.meta
    ? frontMatter.meta.map((meta: Meta) => {
      return { tag: 'meta', attrs: { name: meta.name, content: meta.content }, selfClose: true }
    })
    : []

  return [titleNode, ...metaNodes]
}

export function parseFrontMatter(text: string) {
  const frontMatter = frontMatterToYaml(text)
  return frontMatterToHeadNodes(frontMatter)
}
