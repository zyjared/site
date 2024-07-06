import Path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import markdownit from 'markdown-it'
import markdownitFrontMatter from 'markdown-it-front-matter'
import yaml from 'js-yaml'
import { createHead } from 'unhead'
import type { Head, SSRHeadPayload, SchemaAugmentations, Unhead } from '@unhead/schema'
import { renderSSRHead } from '@unhead/ssr'
import _ from 'lodash'

// #region Utils

export function path(...p: string[]) {
  if (Path.isAbsolute(p[0])) {
    return Path.resolve(...p)
  }
  return Path.resolve(process.cwd(), ...p)
}

export function merge(...args: any[]) {
  const customizer = (objValue: any, srcValue: any) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }

  args = args.filter(Boolean)

  return _.mergeWith({}, ...args, customizer)
}

// #region Md

type FrontMatterYaml = Head

export class Md {
  filepath: string
  frontMatter: FrontMatterYaml = {}
  body: string = ''

  constructor(filepath: string) {
    this.filepath = filepath
  }

  private read() {
    return fs.readFileSync(path(this.filepath), 'utf-8')
  }

  parse() {
    const md = markdownit({
      html: true,
      linkify: true,
      typographer: true,
    })
      .use(markdownitFrontMatter, (fm: string) => {
        this.frontMatter = yaml.load(fm) as FrontMatterYaml
      })

    this.body = md.render(this.read())

    return {
      frontMatter: this.frontMatter,
      body: this.body,
    }
  }
}

// #region Html

type HtmlPayload = SSRHeadPayload & { body: string }

interface HtmlParams {
  head?: Head
  body?: string
}

export class Html {
  head: Unhead<Head<SchemaAugmentations>>
  body: string = ''

  constructor(params?: HtmlParams) {
    this.head = createHead()
    this.setHeadAndBody(params)
  }

  private setHeadAndBody(params?: HtmlParams) {
    if (!params)
      return
    if (params.head) {
      this.head.push(params.head)
    }
    if (params.body) {
      this.body = params.body
    }
  }

  private static template(playload: HtmlPayload) {
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

  async pushHead(...heads: Head[]) {
    heads = heads.filter(Boolean)
    heads.forEach(head => this.head.push(head))
    return this
  }

  setBody(body: string) {
    this.body = body
    return this
  }

  async getPayload(head?: Head): Promise<HtmlPayload> {
    if (head) {
      this.head.push(head)
    }
    return { ...(await renderSSRHead(this.head)), body: this.body }
  }

  async render(params?: HtmlParams) {
    this.setHeadAndBody(params)
    const playload = await this.getPayload()
    return Html.template(playload)
  }

  async save(filepath: string, params?: HtmlParams) {
    const html = await this.render(params)
    await fs.outputFile(path(filepath), html)
  }
}

// #region Public

export class Public {
  dir: string

  constructor(dir: string) {
    this.dir = dir
  }

  has(filepath: string) {
    return fs.existsSync(path(this.dir, filepath))
  }

  autoHead() {
    const head = {} as Head

    if (this.has('style.css')) {
      const item = { rel: 'stylesheet', href: 'style.css' }
      head.link = head.link ? [...head.link, item] : [item]
    }

    if (this.has('favicon.ico')) {
      const item = { rel: 'icon', href: 'favicon.ico', type: 'image/x-icon' }
      head.link = head.link ? [...head.link, item] : [item]
    }

    return head
  }

  copyTo(dest: string, options: { clean?: boolean } = { clean: true }) {
    dest = path(dest)
    if (options.clean) {
      fs.removeSync(dest)
    }
    fs.ensureDirSync(dest)
    fs.copySync(path(this.dir), dest)
  }
}

// #region Config

interface Options {
  input?: string
  output?: string
  public?: string
  dist?: string
  head?: Head
}

const defaultConfig: Options = {
  input: 'README.md',
  output: 'dist/index.html',
  public: 'public',
  dist: 'dist',
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
  },
}

export class Config {
  protected defaultConfig = defaultConfig
  rootConfig: Options = {}
  customConfig: Options = {}

  constructor(config?: Options) {
    if (config) {
      this.customConfig = config
    }
  }

  async getRootConfig() {
    const m = await import('./config')
    if (m && m.default) {
      this.rootConfig = m.default
    }

    return this.rootConfig
  }

  async merge(config?: Options): Promise<Required<Options>> {
    return merge(this.defaultConfig, await this.getRootConfig(), this.customConfig, config)
  }
}

export function defineConfig(options: Options) {
  return options
}

// #region Generate

export async function generate(options: Options = {}) {
  const opt = await new Config().merge(options)

  const assets = new Public(opt.public)
  assets.copyTo(opt.dist, { clean: true })

  const { frontMatter, body } = new Md(opt.input).parse()

  const html = new Html()
  html
    .setBody(body)
    .pushHead(
      assets.autoHead(),
      opt.head,
      frontMatter,
    )

  await html.save(opt.output)
}
