/**
 * @see https://github.com/vuejs/blog/blob/main/.vitepress/theme/posts.data.ts
 */

import { resolve } from 'node:path'
import fs from 'fs-extra'
import { createContentLoader } from 'vitepress'

interface Post {
  title: string
  url: string
  description: string
  date: {
    time: number
    string: string
  }
  image?: string
}

/** 需要的文章数量 */
const POSTS_COUNT = 20

export default createContentLoader('./**/[^index]*.md', {
  excerpt: false,
  transform(raw): Post[] {
    const posts = [] as Post[]
    raw.forEach((post) => {
      const { url, frontmatter } = post

      posts.push({
        title: frontmatter.title || replaceExt(url.split('/').pop(), 'html'),
        url: replaceExt(url, 'html'),
        description: frontmatter.description || '',
        date: fileUpdateTime(url),
        image: frontmatter.image,
      })
    })
    return posts.sort((a, b) => b.date?.time || 0 - a.date?.time || 0).slice(0, POSTS_COUNT)
  },
})

function fileUpdateTime(url: string) {
  const filePath = resolve(__dirname, (replaceExt(url, 'html', 'md', true) || `${url}.md`).slice(1))
  return formatDate(fs.statSync(filePath).mtime)
}

function replaceExt(url: string, from: string, to?: string, nullIfNoMatch?: boolean) {
  if (url.endsWith(`.${from}`))
    return url.replace(new RegExp(`\\.${from}$`), to ? `.${to}` : '')
  return nullIfNoMatch ? null : url
}

function formatDate(raw: string | Date): Post['date'] {
  const date = raw instanceof Date ? raw : new Date(raw)

  if (Number.isNaN(date.getTime())) {
    throw new TypeError('Invalid date')
  }

  return {
    time: +date,
    string: date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  }
}
