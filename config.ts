import { defineConfig } from './core/options'

export default defineConfig({
  input: './public/README.md',
  output: {
    dir: './dist',
    file: 'index.html', // will be './dist/index.html'
    clean: true,
  },
  template: {
    html: { // or './core/templates/index.html' , default lang is 'zh-CN'
      // path: './core/templates/index.html',
      path: './public/index.html',
      lang: 'zh-CN',
    },
  },
  public: './public',
})
