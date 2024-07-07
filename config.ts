import { defineConfig } from './src/config'

export default defineConfig({
  input: {
    filepath: 'public/README.md',
    public: 'public',
    ignore: ['README.md'],
  },
  output: {
    dist: 'public',
    filename: 'index.html',
    clean: false,
  },
  head: {
    htmlAttrs: { lang: 'zh-CN' },
    link: [
      { rel: 'stylesheet', href: 'https://use.typekit.net/rzl1qcy.css' },
      { rel: 'stylesheet', href: 'style.css' },
      { rel: 'stylesheet', href: 'zyjared.css' },
    ],
    meta: [
      { name: 'description', content: 'zyjared, a frontend engineer' },
      { name: 'keywords', content: 'Jared Zhang, zyjared, 张玉江' },
    ],
  },
})
