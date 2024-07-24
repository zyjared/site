import { absolutePath } from './utils'
import { addStyleToHeadFromFile } from './css'
import type { Unhead } from './types'

export async function applyResourcesToHead(head: Unhead, dir: string) {
  const stylepath = absolutePath(dir, 'style.css')
  await addStyleToHeadFromFile(head, stylepath)
}
