import path from 'node:path'
import fs from 'fs-extra'
import { absolutePath } from './utils'
import { addStyleToHeadFromFile } from './css'
import type { Unhead } from './types'

export async function applyResourcesToHead(head: Unhead, publicdir: string) {
  await applyFaviconToHead(head, publicdir)
  await applyStyleToHead(head, publicdir)
}

async function applyStyleToHead(head: Unhead, publicdir: string) {
  await addStyleToHeadFromFile(head, absolutePath(publicdir, 'style.css'))
}

async function applyFaviconToHead(head: Unhead, publicdir: string) {
  const exts = {
    ico: 'image/x-icon',
    png: 'image/png',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
  }

  try {
    const files = await fs.readdir(publicdir)

    for (const file of files) {
      const ext = path.extname(file).slice(1) as keyof typeof exts
      if (file.startsWith('favicon.') && exts[ext]) {
        head.push({ link: [{ rel: 'icon', type: exts[ext], href: `/${file}` }] })
        break
      }
    }
  }
  catch (err) {
    console.error('Error reading directory:', err)
  }
}
