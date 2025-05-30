import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    name: 'shared',
    include: ['shared/test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
  },
})
