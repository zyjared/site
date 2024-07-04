import { defineConfig } from './core/options'

export default defineConfig({
  input: 'README.md',
  output: {
    dir: './dist',
    file: 'index.html', // will be './dist/index.html'
    clean: true,
  },
  template: {
    html: {
      path: './public/index.html',
      lang: 'zh-CN',
    },
  },
  public: './public',
})
