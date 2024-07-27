import { defineConfig } from './src'

export default defineConfig({
  input: 'public/README.md',
  output: 'public/index.html',
  assets: {
    dir: 'public',
    outDir: 'public',
    clean: false,
    overwrite: true,
    include: [],
    ignore: ['README.md'],
  },
  head: {
    htmlAttrs: { lang: 'zh-CN' },
    meta: [
      { name: 'keywords', content: 'Jared Zhang, zyjared' },
    ],
    link: [],
  },
})
