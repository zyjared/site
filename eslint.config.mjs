import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
  },

  typescript: true,

  ignores: [
    'node_modules',
    'dist',
    'build',
  ],
}, {
  rules: {
    'no-console': 'warn',
    'regexp/no-super-linear-backtracking': 'warn',
  },
})
