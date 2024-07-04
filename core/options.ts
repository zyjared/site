import { path } from './path'

export interface Config {
  /** markdown file to be parsed */
  input?: string
  output?: {
    /** output directory */
    dir?: string

    /** output file name */
    file?: string

    /** clean output directory */
    clean?: boolean
  }
  template?: {
    html?: string | {
      path?: string
      lang?: 'zh-CN' | string
      title?: string
    }
  }
  public?: string

}

const defaultOptions = {
  input: 'README.md',
  output: {
    dir: 'dist',
    file: 'index.html',
    clean: true,
  },
  template: {
    html: {
      path: './core/templates/index.html',
      lang: 'zh-CN',
    },
  },
  public: './public',
}

// ==============================================================================

/** all paths will be resolved to absolute */
export function defineConfig(config: Config) {
  // public
  const _public = path(config.public || defaultOptions.public)

  // input
  const input = path(config.input || defaultOptions.input)

  // output
  const output = Object.assign({}, defaultOptions.output, config.output)
  output.file = path(output.dir, output.file)
  output.dir = path(output.dir)

  // template
  const template = Object.assign({}, defaultOptions.template, config.template)
  if (typeof template.html === 'string') {
    template.html = Object.assign({}, defaultOptions.template.html, { path: path(template.html) })
  }
  else {
    template.html = Object.assign({}, defaultOptions.template.html, template.html)
  }
  template.html.path = path(template.html.path)

  return {
    public: _public,
    input,
    output,
    template,
  } as typeof defaultOptions
}

/** all paths are resolved to absolute */
const options = await (async () => {
  const appConfig = await import('../config')
  return appConfig.default || defaultOptions
})()

export default options
