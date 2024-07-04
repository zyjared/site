// sum.test.js
import { describe, expect, it } from 'vitest'
import { parseHTML, stringifyHTML } from '../core/serializer'

describe('serializer', () => {
  const html = '  <div id="app" style="color:red;"><span>test</span><img src="./img.png" /></div>'
  const nodes = [
    {
      tag: 'div',
      attrs: { id: 'app', style: 'color:red;' },
      children: [
        {
          tag: 'span',
          attrs: {},
          children: [
            { tag: '', attrs: {}, children: [], content: 'test', selfClose: false },
          ],
          selfClose: false,
        },
        {
          tag: 'img',
          attrs: { src: './img.png' },
          children: [

          ],
          selfClose: true,
        },
      ],
      selfClose: false,
    },
  ] as any

  it('parse', () => {
    const _nodes = parseHTML(html)
    expect(_nodes).toEqual(nodes)
  })

  it('parse more', () => {
    const _nodes = parseHTML(`<span>test</span><img src="./img.png" />`)
    expect(_nodes).toEqual(nodes[0].children)
  })

  it('stringify', () => {
    const _html = stringifyHTML(nodes)
    expect(_html).toBe(html)
  })

  it('stringify more', () => {
    const _html = stringifyHTML(nodes[0].children)
    expect(_html).toBe('  <span>test</span>\n  <img src="./img.png" />')
  })
})
