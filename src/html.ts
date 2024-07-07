import type { Head, SchemaAugmentations, Unhead } from '@unhead/schema'
import { renderSSRHead } from '@unhead/ssr'
import fs from 'fs-extra'
import { path } from './utils'

export async function renderHtml(head: Unhead<Head<SchemaAugmentations>>, body: string) {
  const { htmlAttrs, headTags, bodyAttrs, bodyTagsOpen, bodyTags } = await renderSSRHead(head)
  return `<!DOCTYPE html>
<html${htmlAttrs}>
  <head>
    ${headTags}
  </head>
  <body${bodyAttrs}>${bodyTagsOpen}${body}${bodyTags}</body>
</html>`
}

export async function saveHtml(filepath: string, head: Unhead<Head<SchemaAugmentations>>, body: string) {
  const html = await renderHtml(head, body)
  fs.writeFileSync(path(filepath), html)
}
