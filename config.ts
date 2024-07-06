import { defineConfig } from '.'

export default defineConfig({
  input: './public/README.md', // default is "README.md"
  output: './dist/index.html',

  public: './public',
  dist: './dist',

  head: {
    htmlAttrs: { lang: 'zh-CN' },
    link: [
      { rel: 'stylesheet', href: 'https://use.typekit.net/rzl1qcy.css' },
    ],
    meta: [
      { name: 'description', content: 'zyjared, a frontend engineer' },
      { name: 'keywords', content: 'Jared Zhang, zyjared, 张玉江' },
    ],
  },
})
