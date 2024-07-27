const { defineConfig } = require('@zyjared/buildpage')

module.exports = defineConfig({
  input: 'README.md',
  output: 'dist/pkg.html',
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
    title: 'pkg',
    link: [
      { rel: 'stylesheet', href: 'custom.css' },
    ],
    meta: [
      { name: 'keywords', content: 'Jared Zhang, zyjared' },
    ],
  },
})
