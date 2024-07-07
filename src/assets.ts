import Path from 'node:path'
import fs from 'fs-extra'
import { path, pathEqual } from './utils'

export function copyDir(src: string, dest: string, options: {
  clean?: boolean
  overwrite?: boolean
  ignore?: string[]
  include?: string[]
} = { clean: false }) {
  src = path(src)
  dest = path(dest)

  if (src === dest)
    return

  const { clean, overwrite, ignore, include } = options

  if (clean) {
    fs.removeSync(dest)
  }

  fs.ensureDirSync(dest)

  let filterFn
  if (include) {
    filterFn = (s: string) => {
      return include.some(i => pathEqual(s, path(src, i)))
    }
  }
  else if (ignore) {
    filterFn = (s: string) => {
      return !ignore.some(i => pathEqual(s, path(src, i)))
    }
  }
  else {
    filterFn = () => true
  }

  fs.copySync(src, dest, { overwrite, filter: filterFn })
}

export function copyFiles(files: string[], toDir: string) {
  fs.ensureDirSync(toDir)

  files.forEach((file) => {
    fs.copyFileSync(path(file), path(toDir, Path.basename(file)))
  })
}
