import { describe, expect, it } from 'vitest'
import { path, peerPath } from '../core/path'
import { defineConfig } from '../core/options'

describe('options', () => {
  it('defineConfig', () => {
    const config = defineConfig({
      input: './public/README.md',
      template: { html: './core/templates/index.html' },
    })
    expect(config).toEqual({
      input: path('public/README.md'),
      output: {
        dir: path('dist'),
        file: path('dist', 'index.html'),
        clean: true,
      },
      public: path('public'),
      template: { html: { path: peerPath('templates/index.html'), lang: 'zh-CN' } },
    })
  })
})
