import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

export function formateOptions(options: Record<string, any>, config: {
  absPathkeys?: string[]
}) {
  const { absPathkeys = [] } = config
  absPathkeys.forEach((key) => {
    if (options[key] && !path.isAbsolute(options[key]))
      options[key] = path.resolve(process.cwd(), options[key])
  })
}

export function relativePath(from: string, to: string) {
  const p = path.relative(
    isDir(from) ? from : path.dirname(from),
    to,
  )
    .split(path.sep)
    .join('/')

  return p.startsWith('.') ? p : `./${p}`
}

export function isDir(p: string) {
  if (!fs.existsSync(p))
    return false
  return fs.statSync(p).isDirectory()
}

export function mainIsModule(url: string) {
  return fileURLToPath(url) === process.argv[1]
}
