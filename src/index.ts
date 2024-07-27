import { createHead } from 'unhead'
import fs from 'fs-extra'
import { absolutePath, copyDirectory, deepMerge } from './core/utils'
import { applyResourcesToHead } from './core/assets'
import { renderHtmlToFile } from './core/html'
import { resolveConfig } from './core/config'
import { parseMarkdown } from './core/md'
import { applyTheme } from './core/theme'

import type { ConfigResolutionStrategy } from './core/config'
import type { Config, DefaultConfig, HeadCreated } from './core/types'

export { defineConfig } from './core/config'

interface MarkdownToHtmlOptions {
  config?: Config
  configResolutionStrategy?: ConfigResolutionStrategy
}

export interface MarkdownToHtmlResult {
  config: DefaultConfig
  head: HeadCreated
  body: string
}

export async function parseMarkdownToHtml(options: MarkdownToHtmlOptions = {}): Promise<MarkdownToHtmlResult> {
  const config = await resolveConfig(options.config, options.configResolutionStrategy || 'preferRoot')
  const assets = config.assets

  const content = fs.readFileSync(absolutePath(config.input), 'utf-8')
  const { frontMatter: { theme, ...mdHead }, body } = parseMarkdown(content)

  const head = createHead()

  // 合并: 配置 head 和 md head
  head.push(deepMerge(config.head, mdHead))

  // public 文件夹的默认行为
  await applyResourcesToHead(head, assets.dir)

  // 主题行为
  const themeBody = await applyTheme({ theme, body, head })

  return {
    config,
    head,
    body: themeBody,
  }
}

export interface BuildpageResult {
  dist: string
  output: string
  html: string
}

export async function buildpage(options?: Config, configResolutionStrategy?: ConfigResolutionStrategy): Promise<BuildpageResult> {
  const { config, head, body } = await parseMarkdownToHtml({ config: options, configResolutionStrategy })
  const assets = config.assets

  // 写入 html
  const htmlResult = await renderHtmlToFile(config.output, head, body)

  // 拷贝 assets
  const assetsPath = copyDirectory(assets.dir, assets.outDir, {
    clean: assets.clean,
    overwrite: assets.overwrite,
    ignore: assets.ignore,
    include: assets.include,
  })

  return { dist: assetsPath, output: htmlResult.filepath, html: htmlResult.html }
}
