import { describe, expect, it } from 'vitest'
import { matchAllTags } from '../.vitepress/plugins/vite-plugin-vue-example.ts/match'
import { transformCodeToMd } from '../.vitepress/plugins/vite-plugin-vue-example.ts/transform'

const v = `
<script setup lang="ts">
console.log('hello world')
</script>
<template>
  <div>hello world</div>
</template>
<style scoped>
div { color: red; }
</style>
`

describe.skip('examplePlugin', () => {
  describe('match', () => {
    it('matchAllTags', () => {
      expect(matchAllTags(v, 'script')).toMatchObject([{ code: `console.log('hello world')` }])
    })

    it('matchAllTags - html', () => {
      expect(matchAllTags(v, 'template')).toMatchObject([{ code: '<div>hello world</div>' }])
    })
  })

  describe('transform', () => {
    it('transformCodeToMd', () => {
      expect(transformCodeToMd(v, '/code.vue', '/docs/code.md')).contains(`import Code from '../code.vue'`)
    })
  })
})
