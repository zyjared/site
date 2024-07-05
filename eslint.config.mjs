import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    indent: 2,
  },
  typescript: true,
}, {
  rules: {
    'no-console': 'warn',
    'regexp/no-super-linear-backtracking': 'warn',
  },
})
