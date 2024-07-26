import { renderSSRHead } from '@unhead/ssr'
import fs from 'fs-extra'
import { absolutePath } from './utils'
import type { Unhead } from './types'

async function renderHtmlDocument(head: Unhead, body: string) {
  const { htmlAttrs, headTags, bodyAttrs, bodyTagsOpen, bodyTags } = await renderSSRHead(head, {
    omitLineBreaks: false,
  })
  return `<!DOCTYPE html>
<html${htmlAttrs}>
  <head>
    ${headTags.replace(/\n/g, '\n    ')}
  </head>
  <body${bodyAttrs}>
    ${bodyTagsOpen}${body.replace(/\n/g, ' ')}${bodyTags}
  </body>
</html>`
}

export async function renderHtml(head: Unhead, body: string) {
  return await renderHtmlDocument(head, body)
}

export async function renderHtmlToFile(filepath: string, head: Unhead, body: string) {
  filepath = absolutePath(filepath)
  const html = await renderHtmlDocument(head, body)

  fs.ensureDirSync(absolutePath(filepath, '..'))
  fs.writeFileSync(filepath, html)

  return { filepath, html }
}
