import fs from 'fs-extra'
import { path } from '../path'
import type { HTMLNode } from '../serializer'
import { parseHTMLBody, parseHTMLHead, stringifyHTMLDocument } from '../serializer'
import opts from '../options'

const optionsR = {
  template: opts.template.html.path,
}

const optionsW = {
  output: opts.output.file,
  lang: opts.template.html.lang,
}

// ==============================================================================

export function readHtml() {
  const options = optionsR
  const text = fs.readFileSync(options.template, 'utf-8')

  return {
    lang: text.match(/lang="([^"]+)"/)?.[1],
    head: parseHTMLHead(text),
    body: parseHTMLBody(text),
  }
}

export function writeHtml(head: HTMLNode[], body: HTMLNode[], lang?: string | 'zh-CN') {
  const html = stringifyHTMLDocument(head, body, lang || optionsW.lang)

  fs.ensureDirSync(path(optionsW.output, '..'))
  fs.writeFileSync(optionsW.output, html)

  return html
}
