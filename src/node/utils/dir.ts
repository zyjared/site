import type { Dirent } from 'fs-extra'
import path from 'node:path'
import fs from 'fs-extra'
import { error } from './log'

export function dir(dir: string) {
  return new Dir(dir)
}

interface ReadDirOptions {
  update?: boolean
  recursive?: boolean
}

export class Dir {
  private ds: Dirent[]

  /** 记录上一次的 `recursive` */
  private lastR: boolean

  constructor(public dir: string, public parent?: Dir) {
    this.dir = path.resolve(this.dir)
  }

  ensure() {
    fs.ensureDirSync(this.dir)
    return this
  }

  path(...paths: string[]) {
    return path.resolve(this.dir, ...paths)
  }

  exists() {
    return fs.existsSync(this.dir)
  }

  dirents(options: ReadDirOptions = {}) {
    const { update, recursive } = options
    if ((this.lastR !== recursive) || update || !this.ds) {
      this.lastR = recursive
      this.ds = fs.readdirSync(this.dir, { recursive, withFileTypes: true })
    }
    return this.ds
  }

  read(options: ReadDirOptions = {}) {
    return this.dirents(options).map(d => d.name)
  }

  files() {
    return this.dirents().filter(d => d.isFile())
  }

  dirs() {
    return this.dirents().filter(d => d.isDirectory())
  }

  traverse(fn: TraverseFn) {
    if (!this.exists()) {
      error('dir not exist', this.dir)
    }
    traverseDir(this, fn)
  }

  touch(filename: string, content: string = null, options: { force?: boolean } = {}) {
    const { force = false } = options
    const filepath = this.path(filename)

    if (force || !fs.existsSync(filepath)) {
      fs.outputFileSync(filepath, content || '')
    }

    return this
  }

  mkdir(dirname: string, options: { force?: boolean } = {}) {
    const { force = false } = options
    const dirpath = this.path(dirname)
    if (force || !fs.existsSync(dirpath)) {
      fs.ensureDirSync(dirpath)
    }
    return new Dir(dirpath, this)
  }
}

/**
 * - 返回 `false` 时，停止对该文件夹的遍历
 * - 可以返回该文件夹下的文件更新遍历
 */
type TraverseFn = (dir: Dir) => void | false | Dirent[]

function traverseDir(
  dir: Dir,
  callback: TraverseFn,
) {
  const queue = [dir]
  while (queue.length > 0) {
    const curDir = queue.shift()

    const res = callback(curDir)

    if (res === false)
      break

    const entries = Array.isArray(res) ? res : curDir.dirents()
    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        queue.push(new Dir(curDir.path(entry.name)))
      }
    })
  }
}
