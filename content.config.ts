import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      source: 'posts/**',
      type: 'page',
    }),
    bookmarks: defineCollection({
      source: 'bookmarks/**',
      type: 'page',
    }),
  },
})
