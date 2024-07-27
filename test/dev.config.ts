import { defineConfig } from '../src'

export default defineConfig({
  input: 'test/README.md',
  output: 'dist/index.html',
  assets: {
    dir: 'test',
    outDir: 'dist',
    clean: false,
    overwrite: true,
    include: [],
    ignore: ['README.md', 'dev.config.ts', 'test.config.ts'],
  },
  head: {
    htmlAttrs: { lang: 'en' },
    meta: [
      { name: 'keywords', content: 'Jared Zhang, zyjared' },
    ],
    link: [],
  },
})
