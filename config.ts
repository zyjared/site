import { defineConfig } from '.'

export default defineConfig({
  input: {
    filepath: 'public/README.md',
    public: 'public',
  },
  output: {
    dist: 'public',
    filename: 'index.html',
    clean: true,
  },
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
