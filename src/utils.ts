import Path from 'node:path'
import process from 'node:process'
import _ from 'lodash'

export function path(...p: string[]) {
  if (Path.isAbsolute(p[0])) {
    return Path.resolve(...p)
  }
  return Path.resolve(process.cwd(), ...p)
}

export function pathEqual(path1: string, path2: string) {
  return path(path1) === path(path2)
}

export function merge<T = any, U = any>(...args: U[]): T {
  args = args.filter(Boolean)
  return (_.mergeWith({}, ...args, (objValue: any, srcValue: any) => {
    if (_.isArray(objValue)) {
      return objValue.concat(srcValue)
    }
  }))
}
