const { defineConfig } = require('./build/index')

module.exports = defineConfig({
  input: 'README.md',
  output: 'dist/test.html',
  assets: {
    dir: '.',
    outDir: '.',
    clean: false,
    overwrite: true,
    include: [],
    ignore: ['README.md'],
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
