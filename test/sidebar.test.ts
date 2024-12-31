import { beforeEach, describe, expect, it } from 'vitest'
import { defineSidebar } from '../src/node/config/defineSidebar'

describe('defineSidebar', () => {
  let learn: any
  let api: any
  let sidebar: any

  beforeEach(() => {
    learn = {
      base: 'learn',
      items: [
        { text: '01', link: '01' },
        { base: '02', items: [{ text: '02-01', link: '02-01' }] },
        { base: '/learn/03', items: [{ text: '03-01', link: '03-01' }] },
        {
          items: [{
            // 就近匹配 `learn/04`
            base: '04',
            items: [{ text: '04-01', link: '04-01' }],
          }],
        },
      ],
    }

    api = {
      base: 'api',
      items: [
        { text: '01', link: '01' },
      ],
    }

    sidebar = {
      '/docs/learn/': {
        base: '/docs/learn/',
        items: [
          { text: '01', link: '01' },
          { base: '/docs/learn/02/', items: [{ text: '02-01', link: '02-01' }] },
          { base: '/docs/learn/03/', items: [{ text: '03-01', link: '03-01' }] },
          { items: [{ base: '/docs/learn/04/', items: [{ text: '04-01', link: '04-01' }] }] },
        ],
      },
      '/docs/api/': {
        base: '/docs/api/',
        items: [
          { text: '01', link: '01' },
        ],
      },
    }
  })

  describe('defineSidebar', () => {
    it('no options', () => {
      expect(defineSidebar(learn).base).toBe('learn')
    })

    it('with options - multi', () => {
      expect(
        defineSidebar(
          [learn, api],
          { root: 'docs', nest: true },
        ),
      ).toEqual(sidebar)
    })

    it('with options - nested multi', () => {
      expect(
        defineSidebar(
          defineSidebar(learn, {}),
          { root: 'docs', nest: false },
        ),
      ).toEqual({ '/docs/learn/': sidebar['/docs/learn/'] })
    })
  })
})
