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
import rootConfig from './config'

// #region Utils

export function path(...p: string[]) {
  if (Path.isAbsolute(p[0])) {
    return Path.resolve(...p)
  }
  return Path.resolve(process.cwd(), ...p)
}

export function merge<T = any, U = any>(...args: U[]): T {
  args = args.filter(Boolean)
  return (_.mergeWith({}, ...args, (objValue: any, srcValue: any) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }))
}

// #region Md

type FrontMatterYaml = Head

export class Md {
  static read(filepath: string) {
    return fs.readFileSync(path(filepath), 'utf-8')
  }

  static toHtml(filepath: string) {
    let frontMatter: FrontMatterYaml = {}
    const md = markdownit({
      html: true,
      linkify: true,
      typographer: true,
    }).use(markdownitFrontMatter, (fm: string) => {
      frontMatter = yaml.load(fm) as FrontMatterYaml
    })

    const body = md.render(Md.read(filepath))
    return { frontMatter, body }
  }
}

// #region Html

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

  static async template(head: Unhead<Head<SchemaAugmentations>>, body: string) {
    const { htmlAttrs, headTags, bodyAttrs, bodyTagsOpen, bodyTags } = { ...(await renderSSRHead(head)) }
    return `<!DOCTYPE html>
  <html${htmlAttrs}>
  <head>
    ${headTags}
  </head>
  <body${bodyAttrs}>${bodyTagsOpen}${body}${bodyTags}</body>
</html>`
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

  async pushHead(...heads: Head[]) {
    heads = heads.filter(Boolean)
    heads.forEach(head => this.head.push(head))
    return this
  }

  setBody(body: string) {
    this.body = body
    return this
  }

  async render(params?: HtmlParams) {
    this.setHeadAndBody(params)
    return await Html.template(this.head, this.body)
  }

  async save(filepath: string, params?: HtmlParams) {
    const html = await this.render(params)
    fs.outputFile(path(filepath), html)
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

    if (path(this.dir) === dest)
      return

    if (options.clean) {
      fs.removeSync(dest)
    }
    fs.ensureDirSync(dest)
    fs.copySync(path(this.dir), dest)
  }
}

// #region Config

interface ConfigOptions {
  input: {
    filepath: string
    public: string
  }
  output: {
    dist: string
    clean: boolean
    filename: string
    filepath: string
  }
  head: Head
}

type Options = {
  [k in keyof ConfigOptions]?: ConfigOptions[k] extends Record<string, any> ? Partial<ConfigOptions[k]> : ConfigOptions[k]
}

export function defineConfig(options: Options) {
  return options
}

export class Config {
  static readonly rootConfig: Options = rootConfig
  static readonly defaultConfig: ConfigOptions = {
    input: {
      filepath: 'public/README.md.md',
      public: 'public',
    },
    output: {
      dist: 'dist',
      filename: 'index.html',
      filepath: '',
      clean: true,
    },
    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      ],
    },
  }

  static formate(...options: (Options | undefined)[]) {
    const config = merge<ConfigOptions>(Config.defaultConfig, Config.rootConfig, ...options)
    if (!config.output.filepath) {
      config.output.filepath = path(config.output.dist, config.output.filename)
    }

    return config
  }
}

// #region Generate

export async function generate(options?: Options) {
  const config = Config.formate(options)
  const { frontMatter, body } = Md.toHtml(config.input.filepath)

  const assets = new Public(config.input.public)
  assets.copyTo(config.output.dist, { clean: config.output.clean })

  const html = new Html()
  html
    .setBody(body)
    .pushHead(
      assets.autoHead(),
      config.head,
      frontMatter,
    )

  await html.save(config.output.filepath)
}
