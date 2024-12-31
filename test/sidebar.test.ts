import { describe, expect, it } from 'vitest'
import { defineSidebar } from '../.vitepress/config/sidebar/_utils'

const learn = {
  base: 'learn',
  items: [
    { text: '01', link: '01' },
    { base: '02', items: [{ text: '02-01', link: '02-01' }] },
    { base: '/docs/learn/03', items: [{ text: '03-01', link: '03-01' }] },
    { items: [{ base: '04', items: [{ text: '04-01', link: '04-01' }] }] },
  ],
}

const sidebar = {
  '/docs/learn/': {
    base: '/docs/learn/',
    items: [
      { text: '01', link: '01' },
      { base: '/docs/learn/02/', items: [{ text: '02-01', link: '02-01' }] },
      { base: '/docs/learn/03/', items: [{ text: '03-01', link: '03-01' }] },
      { items: [{ base: '/04/', items: [{ text: '04-01', link: '04-01' }] }] },
    ],
  },
}

describe.skip('defineSidebar', () => {
  it('no options', () => {
    expect(defineSidebar(learn).base).toBe('learn')
  })

  it('with options', () => {
    expect(defineSidebar({ learn }, { base: 'docs' })).toEqual(sidebar)
  })

  it('with options - list', () => {
    expect(defineSidebar(learn.items, { base: 'docs/learn' })).toEqual(sidebar['/docs/learn/'].items)
  })
})
