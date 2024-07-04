import { describe, expect, it } from 'vitest'
import { readMd } from '../../core/fs/md'

describe('fs md', () => {
  it('readMd', () => {
    const md = readMd()
    expect(md).toBeTruthy()
  })
})
