import { defineCollection, defineContentConfig } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      source: 'posts/**',
      type: 'page',
    }),
    bm: defineCollection({
      source: 'bm/**',
      type: 'page',
    }),
  },
})
