import Path from 'node:path'
import { afterAll, describe, expect, it } from 'vitest'
import fs from 'fs-extra'
import { path, peerPath } from '../core/path'

describe('path', () => {
  it('path', () => {
    const p = 'templates'
    expect(path(p)).toBe(Path.resolve(process.cwd(), p))
  })

  it('peerPath', () => {
    const p = 'templates'
    expect(peerPath(`./${p}`)).toBe(Path.resolve(process.cwd(), `./core/${p}`))
  })
})
