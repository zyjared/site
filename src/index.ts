import { createHead } from 'unhead'
import fs from 'fs-extra'
import type { Config } from './config'
import { formateConfig, getRootConfig } from './config'
import { parseMd } from './md'
import { copyDir } from './assets'
import { merge, path } from './utils'
import { saveHtml } from './html'
import { renderHtmlBodyByTheme } from './theme'

export async function generate(options: Config = {}) {
  const rootConfig = await getRootConfig()
  const config = formateConfig(rootConfig, options)

  const content = fs.readFileSync(path(config.input.filepath), 'utf-8')
  const { frontMatter: { theme, ...mdHead }, body } = parseMd(content)

  copyDir(config.input.public, config.output.dist, {
    clean: config.output.clean,
    overwrite: config.output.overwrite,
    ignore: config.input.ignore,
  })

  const head = createHead()
  head.push(merge(config.head, mdHead))

  saveHtml(config.output.filepath, head, renderHtmlBodyByTheme(theme, body))
}
