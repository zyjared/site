import yaml from 'js-yaml'
import markdownit from 'markdown-it'
import markdownitFrontMatter from 'markdown-it-front-matter'
import type { Dict, FrontMatter } from './types'

interface MarkdownParserOptions {
  onFrontMatter: (fm: string) => void
  html?: boolean
  linkify?: boolean
  typographer?: boolean
}

function parseFrontMatter<T extends Dict = FrontMatter>(content: string) {
  return yaml.load(content, { schema: yaml.CORE_SCHEMA }) as T
}

function createMarkdownParser(options: MarkdownParserOptions) {
  const { onFrontMatter, html = true, linkify = true, typographer = true } = options
  return markdownit({
    html,
    linkify,
    typographer,
  }).use(markdownitFrontMatter, onFrontMatter)
}

export function parseMarkdown<T extends Dict = FrontMatter>(content: string) {
  let frontMatter = {} as T
  const md = createMarkdownParser({
    onFrontMatter: (fm: string) => {
      frontMatter = parseFrontMatter<T>(fm)
    },
  })

  const body = md.render(content)
  return { frontMatter, body }
}
