import { capitalize, isCapitalized, uncapitalize } from '../utils/str'

export function signName(name: string, sign: string) {
  const capSign = capitalize(sign)
  const lowerSign = uncapitalize(sign)

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

export interface Import {
  from: string
  name: string
  as?: string
}

interface SignImportOpts {
  sign: string

  /**
   *  如果已经有 as，是否强制替换
   */
  force?: boolean
}

export function signImport(impt: Import, opts: SignImportOpts): Import {
  const { sign, force } = opts

  if (impt.as && !force)
    return impt

  const { name } = impt

  const fixer = signName(name, sign)

  if (fixer !== name) {
    impt.as = fixer
  }

  return impt
}

interface SignAutoImportsOpts {
  importants: string[]
  sign: string
}

interface SignAutoImportsParseOpts extends SignAutoImportsOpts {
  from: string
  format: boolean
}

/**
 * 为 import 的名字增加标记名
 *
 * ```js
 * signAutoImports({
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
export function signAutoImports(opts: SignAutoImportsOpts): Array<string | [string, string]>
export function signAutoImports(opts: SignAutoImportsParseOpts): Import[]
export function signAutoImports(opts: SignAutoImportsOpts | SignAutoImportsParseOpts) {
  const { sign, importants } = opts

  const res = importants.map((it) => {
    const fixer = signName(it, sign)
    return fixer === it ? it : [it, fixer]
  })

  const { from, format } = opts as SignAutoImportsParseOpts

  return !format
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
