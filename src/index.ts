import { createHead } from 'unhead'
import fs from 'fs-extra'
import type { Config, ConfigResolutionStrategy } from './core/config'
import { resolveConfig } from './core/config'
import { parseMarkdown } from './core/md'
import { applyResourcesToHead } from './core/assets'
import { absolutePath, copyDirectory, deepMerge } from './core/utils'
import { renderHtmlToFile } from './core/html'
import { applyTheme } from './core/theme'

export { defineConfig } from './core/config'

export async function buildpage(options: Config = {}, configResolutionStrategy: ConfigResolutionStrategy = 'preferRoot') {
  const { assets, ...config } = await resolveConfig(options, configResolutionStrategy)

  const content = fs.readFileSync(absolutePath(config.input), 'utf-8')
  const { frontMatter: { theme, ...mdHead }, body } = parseMarkdown(content)

  const head = createHead()

  // 合并: 配置 head 和 md head
  head.push(deepMerge(config.head, mdHead))

  // public 文件夹的默认行为
  await applyResourcesToHead(head, assets.dir)

  // 主题行为
  const themeBody = await applyTheme({ theme, body, head })

  // 写入 html
  const saveTo = await renderHtmlToFile(config.output, head, themeBody)

  // 拷贝 assets
  const assetsPath = copyDirectory(assets.dir, assets.outDir, {
    clean: assets.clean,
    overwrite: assets.overwrite,
    ignore: assets.ignore,
    include: assets.include,
  })

  return { assets: assetsPath, output: saveTo }
}
