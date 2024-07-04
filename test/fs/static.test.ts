import { describe, expect, it } from 'vitest'
import { copyStatic } from '../../core/fs/static'

describe('fs static', () => {
  it('copyStatic', () => {
    const opts = copyStatic()
    expect(opts).toBeTruthy()
  })
})
