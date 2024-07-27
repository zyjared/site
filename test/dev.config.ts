import { defineConfig } from '../src'

export default defineConfig({
  input: 'test/README.md',
  output: 'dist/dev.html',
  assets: {
    dir: 'test',
    outDir: 'dist',
    clean: false,
    overwrite: true,
    include: [],
    ignore: ['README.md', 'dev.config.ts', 'test.config.js', 'pkg.config.js'],
  },
  head: {
    htmlAttrs: { lang: 'en' },
    title: 'dev',
    meta: [
      { name: 'keywords', content: 'Jared Zhang, zyjared' },
    ],
    link: [],
  },
})
