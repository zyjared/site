import type { Head } from '@unhead/schema'
import _ from 'lodash'
import { path } from './utils'

export interface DefaultConfig {
  input: {
    filepath: string
    public: string
    ignore?: string[]
    include?: string[]
  }
  output: {
    dist: string
    filename: string
    filepath: string
    clean: boolean
    overwrite: boolean
  }
  head: Head
}

export type Config = {
  [k in keyof DefaultConfig]?: DefaultConfig[k] extends Record<string, any> ? Partial<DefaultConfig[k]> : DefaultConfig[k]
}

const defaultConfig: DefaultConfig = {
  input: {
    filepath: 'public/README.md',
    public: 'public',
  },
  output: {
    dist: 'dist',
    filename: 'index.html',
    filepath: '',
    clean: true,
    overwrite: true,
  },
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    ],
    link: [
      { rel: 'icon', href: '/favicon.ico' },
    ],
  },
}

export function mergeConfig(...configs: Config[]) {
  const config = _.merge({}, ...configs) as DefaultConfig
  if (!config.output.filepath) {
    config.output.filepath = path(config.output.dist, config.output.filename)
  }
  return config
}

export function defineConfig(config: Config) {
  return config
}

export async function getRootConfig(configPath = 'config.ts') {
  try {
    const config = await import(path(configPath))
    return config.default
  }
  catch (error) {
    return {}
  }
}

export function formateConfig(rootConfig: Config, config: Config) {
  return mergeConfig(defaultConfig, rootConfig, config)
}
