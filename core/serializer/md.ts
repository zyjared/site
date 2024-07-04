import markdownit from 'markdown-it'
import markdownitFrontMatter from 'markdown-it-front-matter'
import { frontMatterToYaml, parseFrontMatter } from './front-matter'
import type { HTMLNode } from './html'

export function parseMd(text: string) {
  let yaml: Record<string, any> = {}
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownitFrontMatter, (fm: string) => {
      yaml = frontMatterToYaml(fm)
    })

  const body = md.render(text)

  return {
    yaml,
    body,
  }
}
