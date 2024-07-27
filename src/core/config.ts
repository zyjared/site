import type { FileImportOptions } from './utils'
import { deepMerge, importModuleFromPath } from './utils'
import type { Config, DefaultConfig } from './types'

const defaultConfig: DefaultConfig = {
  input: 'README.md',
  output: 'index.html',
  assets: {
    dir: '.',
    ignore: ['style.css'],
    include: [],
    outDir: '.',
    clean: false,
    overwrite: true, // dev
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    link: [],
  },
}

export type ConfigResolutionStrategy = boolean | 'preferRoot' | 'preferUser'

/**
 * resolutionStrategy:
 *
 * 根据 `resolutionStrategy` 的值决定如何合并根配置和用户配置：
 *  - `false`        : config
 *  - `true`         : root    > config。
 *  - `'preferRoot'` : root   || config。
 *  - `'preferUser'` : config || root
 *  - `'default'`    : config
 */
export async function resolveConfig(config: Config | undefined, resolutionStrategy: ConfigResolutionStrategy = false) {
  const rootConfig = await loadConfig()

  switch (resolutionStrategy) {
    case true:
      if (rootConfig) {
        config = deepMerge({}, rootConfig, config)
      }
      break
    case 'preferRoot':
      config = rootConfig || config
      break
    case 'preferUser':
      config = config || rootConfig
      break
    default:
      break
  }

  return deepMerge<DefaultConfig>({}, defaultConfig, config)
}

export async function loadConfig<T = any>(options: FileImportOptions = {
  filepath: './buildpage.config',
  extensions: ['.js', '.cjs'],
}): Promise<T | null> {
  options.dirname = __dirname
  return await importModuleFromPath(options)
}

export function defineConfig(config: Config) {
  return config
}
