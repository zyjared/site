import type { Head } from '@unhead/schema'
import yaml from 'js-yaml'
import markdownit from 'markdown-it'
import markdownitFrontMatter from 'markdown-it-front-matter'
import type { Dict } from './types'

export type FrontMatter = Head & Dict

function parseFrontMatter<T extends Dict = FrontMatter>(content: string) {
  const frontMatter = yaml.load(content, { schema: yaml.CORE_SCHEMA }) as T
  return frontMatter
}

export function parseMd<T extends Dict = FrontMatter>(content: string) {
  let frontMatter: FrontMatter = {}
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownitFrontMatter, (fm: string) => {
    frontMatter = parseFrontMatter<T>(fm)
  })

  const body = md.render(content)
  return { frontMatter, body }
}
