import Path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import markdownit from 'markdown-it'
import markdownitFrontMatter from 'markdown-it-front-matter'
import yaml from 'js-yaml'
import { createHead } from 'unhead'
import type { Head, SSRHeadPayload } from '@unhead/schema'
import { renderSSRHead } from '@unhead/ssr'
import _ from 'lodash'

type FontMatterYaml = Head
type HtmlPayload = SSRHeadPayload & { body: string }

function path(...p: string[]) {
  if (Path.isAbsolute(p[0])) {
    return Path.resolve(...p)
  }
  return Path.resolve(process.cwd(), ...p)
}

function merge(...args: any[]) {
  const customizer = (objValue: any, srcValue: any) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }

  args = args.filter(Boolean)

  return _.mergeWith({}, ...args, customizer)
}

// ============================
// markdown
// ============================

function _readMd(filepath: string) {
  return fs.readFileSync(path(filepath), 'utf-8')
}

function _parseMd(text: string) {
  let frontMatter: FontMatterYaml = {}
  const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
  })
    .use(markdownitFrontMatter, (fm: string) => {
      frontMatter = yaml.load(fm) as FontMatterYaml
    })

  const body = md.render(text)

  return {
    frontMatter,
    body,
  }
}

 function getMd(filepath: string) {
  return _parseMd(_readMd(filepath))
}

// ============================
// html
// ============================

async function _htmlHead(frontMatter: FontMatterYaml) {
  const head = createHead()
  head.push(frontMatter)

  return await renderSSRHead(head)
}

function _htmlTemplate(playload: HtmlPayload) {
  const { htmlAttrs, headTags, bodyAttrs, bodyTagsOpen, body, bodyTags } = playload
  return `<!DOCTYPE html>
<html${htmlAttrs}>
<head>
${headTags}
</head>
<body${bodyAttrs}>
${bodyTagsOpen}
${body}
${bodyTags}
</body>
</html>`
}

 async function renderHtml(frontMatter: FontMatterYaml, body = '') {
  const playload = await _htmlHead(frontMatter)

  return _htmlTemplate({ ...playload, body })
}

async function saveHtml(html: string, filepath: string) {
  await fs.outputFile(path(filepath), html)
}

// ============================
// public
// ============================

 function copyPublic(publicDir: string, distDir: string) {
  fs.removeSync(path(distDir))
  fs.ensureDirSync(path(distDir))
  fs.copySync(path(publicDir), path(distDir))
}


function _fileInPublic(filename: string, publicDir: string) {
  return fs.existsSync(path(publicDir, filename))
}

function publicFrontMatter(publicDir: string) {
  const frontMatter = {} as FontMatterYaml

  if (_fileInPublic('style.css', publicDir)) {
    const item = { rel: 'stylesheet', href: 'style.css' }
    frontMatter.link = frontMatter.link ? [...frontMatter.link, item] : [item]
  }

  if (_fileInPublic('favicon.ico', publicDir)) {
    const item = { rel: 'icon', href: 'favicon.ico', type: 'image/x-icon' }
    frontMatter.link = frontMatter.link ? [...frontMatter.link, item] : [item]
  }

  return frontMatter
}

// ============================
// options
// ============================

interface Options {
  input: string
  output: string
  public: string
  dist: string
  head: FontMatterYaml
}

const _defaultOptions = {
  input: 'README.md',
  output: 'dist/index.html',
  public: 'public',
  dist: 'dist',
  head: {},
}

const defaultFontMatter: FontMatterYaml = {
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  ],
}

export function defineConfig(options: Partial<Options>) {
  return options
}

async function mergeConfig(options: Partial<Options>): Promise<Options> {
  const custom = await import('./config')
  return merge(_defaultOptions, custom.default, options)
}

// ============================
// generate
// ============================

export async function generate(options: Partial<Options>={}) {
  const opt = await mergeConfig(options)
  console.log(JSON.stringify(opt, null, 2))

  copyPublic(opt.public, opt.dist)

  const { frontMatter, body } = getMd(opt.input)
  const autoFrontMatter = publicFrontMatter(opt.public)
  const fm = merge(defaultFontMatter, opt.head, autoFrontMatter, frontMatter)
  console.log(JSON.stringify( fm, null, 2))

  const html = await renderHtml(fm, body)

  await saveHtml(html, opt.output)
}
