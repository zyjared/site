const { defineConfig } = require('../build/index')

module.exports = defineConfig({
  input: 'README.md',
  output: 'dist/test.html',
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
    link: [
      { rel: 'stylesheet', href: 'custom.css' },
    ],
    meta: [
      { name: 'keywords', content: 'Jared Zhang, zyjared' },
    ],
  },
})
