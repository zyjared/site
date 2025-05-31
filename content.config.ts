import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const BaseSchema = z.object({
  title: z.string(),
  description: z.string().default(''),
  hide: z.boolean().default(false),
})

const BmBaseFileSchema = BaseSchema.extend({
  order: z.number().optional(),
  icon: z.string().optional(),
})

// json 文件中的子项
const BmJsonChildSchema = BaseSchema.extend({
  link: z.string(),
})

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      source: 'posts/**',
      type: 'page',
      schema: BaseSchema.extend({
        date: z.string().optional(),
      }),
    }),
    bm: defineCollection({
      source: 'bm/**',
      type: 'page',
      schema: BmBaseFileSchema.extend({
        children: z.union([
          z.array(BmBaseFileSchema),
          z.array(BmJsonChildSchema),
        ]),
      }),
    }),
  },
})
