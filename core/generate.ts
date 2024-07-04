import { readHtml, writeHtml } from './fs/html'
import { readMd } from './fs/md'
import { copyStatic } from './fs/static'
import { frontMatterToHeadNodes } from './serializer/front-matter'

/**
 * config is defined in own ts file.
 * needn't to reuse config.
 */

export function generateHtml() {
  const template = readHtml()
  const md = readMd()

  const lang = md.yaml.lang || template.lang

  const head = template.head.concat(frontMatterToHeadNodes({ title: md.yaml.title, meta: md.yaml.meta }))

  const body = template.body.concat([{ content: md.body }])

  copyStatic()

  writeHtml(head, body, lang)
}
