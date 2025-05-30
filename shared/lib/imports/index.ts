import { capitalize, isCapitalized, uncapitalize } from '../../core/string'

export interface Import {
  from: string
  name: string
  as?: string
}

interface MarkOptions {
  mark: string

  /**
   *  如果已经有 as，是否强制替换
   */
  force?: boolean
}

export function markName(name: string, mark: string) {
  const capSign = capitalize(mark)
  const lowerSign = uncapitalize(mark)

  const reg = new RegExp(`(${capSign}|${lowerSign})`)

  const match = name.match(reg)
  if (match && match.index === 0) {
    return name
  }

  const fit = match ? name.replace(match[0], '') : name
  const fixer = fit.startsWith('use')
    ? fit.replace(new RegExp(`use(${capSign})?`), `use${capSign}`)
    : `${isCapitalized(name) ? capSign : lowerSign}${capitalize(fit)}`

  return fixer
}

export function markImport(impt: Import, opts: MarkOptions): Import {
  const { mark, force } = opts

  if (impt.as && !force)
    return impt

  const { name } = impt

  const fixer = markName(name, mark)

  if (fixer !== name) {
    impt.as = fixer
  }

  return impt
}

interface BatchMarkOptions {
  importants: string[]
  mark: string
}

interface BatchMarkToImportOptions extends BatchMarkOptions {
  from: string

  /**
   * 是否返回 Import[] 类型
   */
  toImport: boolean
}

/**
 * 为 import 的名字增加标记名
 *
 * ```js
 * markImports({
 *   sign: 'motion',
 *   importants: ['motion', 'AnimatePresenceMotion', 'useAnimate', 'useReducedMotion']
 * })
 *
 * //
 * [
 *   'motion',                                     // 不变
 *   ['AnimatePresence', 'MotionAnimatePresence'], // 追加并保持首字母大写
 *   ['useAnimate', 'useMotionAnimate'],           // 追加标记
 *   ['useReducedMotion', 'useMotionReduced'],     // 调整顺序
 * ]
 * ```
 */
export function markImports(opts: BatchMarkOptions): Array<string | [string, string]>
export function markImports(opts: BatchMarkToImportOptions): Import[]
// export function markImports(imports: Import[], mark: string): Import[]
export function markImports(opts: BatchMarkOptions | BatchMarkToImportOptions) {
  const { mark, importants } = opts

  const res = importants.map((it) => {
    const fixer = markName(it, mark)
    return fixer === it ? it : [it, fixer]
  })

  const { from, toImport } = opts as BatchMarkToImportOptions

  return !toImport
    ? res
    : res.map((v) => {
        const imp = {
          from,
          name: '',
        } as Import

        if (Array.isArray(v)) {
          imp.name = v[0]!
          imp.as = v[1]
        }
        else {
          imp.name = v
        }

        return imp
      })
}
