import path from 'node:path'
import process from 'node:process'
import _ from 'lodash'
import fs from 'fs-extra'

// -----------------------------------------------
// 路径
// -----------------------------------------------

export function absolutePath(...p: string[]) {
  if (p[0] && path.isAbsolute(p[0])) {
    return path.resolve(...p)
  }
  return path.resolve(process.cwd(), ...p)
}

export function relativePath(src: string, dest: string, preDot = true) {
  const relative = path.relative(src, dest).split(path.sep).join('/')

  if (preDot && !relative.startsWith('.'))
    return `./${relative}`
  else
    return relative
}

// -----------------------------------------------
// 对象
// -----------------------------------------------

export function deepMerge<T = any, U = any>(...args: U[]): T {
  args = args.filter(Boolean)
  return (_.mergeWith({}, ...args, (objValue: any, srcValue: any) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }))
}

// -----------------------------------------------
// 文件
// -----------------------------------------------

export function copyDirectory(src: string, dest: string, options: {
  clean?: boolean
  overwrite?: boolean
  ignore?: string[]
  include?: string[]
} = { clean: false }) {
  src = absolutePath(src)
  dest = absolutePath(dest)

  if (src === dest)
    return dest

  const { clean, overwrite, ignore, include } = options

  if (clean) {
    fs.removeSync(dest)
  }

  fs.ensureDirSync(dest)

  const includePaths = new Set(include?.map(i => absolutePath(src, i)) ?? [])
  const ignorePaths = new Set(ignore?.map(i => absolutePath(src, i)) ?? [])

  const filterFn = (s: string) => {
    if (includePaths.size > 0) {
      return includePaths.has(s)
    }
    if (ignorePaths.size > 0) {
      return !ignorePaths.has(s)
    }
    return true
  }

  fs.copySync(src, dest, { overwrite, filter: filterFn })

  return dest
}

// -----------------------------------------------
// 模块
// -----------------------------------------------

export interface FileImportOptions {
  dirname?: string
  filepath: string
  extensions: string[]
}

/**
 * 根据尾缀依次查找，成功返回文件路径，否则返回 null
 *
 * 如: ['.js', '.cjs', '.ts']
 */
async function resolveFilePathByExtensions(options: FileImportOptions) {
  let { dirname, filepath, extensions } = options

  const abspath = absolutePath(filepath)
  filepath = dirname ? relativePath(dirname, filepath) : filepath

  for (const ext of extensions) {
    const filePath = `${filepath}${ext}`
    if (await fs.pathExists(abspath + ext)) {
      return filePath
    }
  }
  return null
}

/**
 * options.dirname 默认为 根目录
 */
export async function importModuleFromPath(options: FileImportOptions) {
  if (!options.dirname)
    options.dirname = absolutePath()

  const filePath = await resolveFilePathByExtensions(options)

  if (!filePath)
    return null

  try {
    const config = await import(`${filePath}`)
    return config.default || config
  }
  catch (error) {
    console.error(`Failed to load: ${filePath}`, error)
    return null
  }
}
