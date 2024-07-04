import { describe, expect, it } from 'vitest'
import { readHtml, writeHtml } from '../../core/fs/html'
import type { HTMLNode } from '../../core/serializer'

describe('fs html', () => {
  const expectParseHtml: {
    head: HTMLNode[]
    body: HTMLNode[]
  } = {
    head: [
      { tag: 'meta', attrs: { charset: 'UTF-8' }, children: [], selfClose: true },
      { tag: 'meta', attrs: { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }, children: [], selfClose: true },
      { tag: 'title', attrs: {}, children: [
        { tag: '', attrs: {}, children: [], content: 'Document', selfClose: false },
      ], selfClose: false },
    ],
    body: [],
  }

  // it('readHtml', () => {
  //   const { head, body } = readHtml()
  //   expect({ head, body }).toEqual(expectParseHtml)
  // })

  it('writeHtml', () => {
    const html = writeHtml(expectParseHtml.head, expectParseHtml.body)
    expect(html).toContain('<html lang="zh-CN">')
  })
})
