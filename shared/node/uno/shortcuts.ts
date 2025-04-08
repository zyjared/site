import type { DynamicShortcut } from 'unocss'

interface DxShortcutOptions {
  name: string

  /**
   * 默认的前缀
   *
   * 'text'、'bg'
   */
  base: string

  /**
   * 预设的颜色
   *
   * 'white dark:white hover:black dark:hover:black'
   */
  value: string

  /**
   * 不会在变体中被使用
   */
  extra?: string
}

/**
 * 使关于颜色的 shortcut 可重用。
 *
 * 在变体中被使用时，除去 dark 外的变体。
 *
 * @example
 * name='ctx-custom', base='text', value='white dark:black dark:hover:blue'
 *
 * 'ctx-custom'
 * => 'text-white hover:text-black dark:text-black dark:hover:text-blue'
 *
 * 'border-ctx-custom'
 * => 'border-white hover:border-black dark:border-black dark:hover:border-blue'
 */
export function dxShortcut(options: DxShortcutOptions): DynamicShortcut {
  const {
    name,
    base,
    value,
    extra = '',
  } = options

  const pattern = new RegExp(`^(.*)${name}(.*)$`)

  const defaultModifier = base ? `${base}-` : ''
  let values = value.split(' ').map((v) => {
    const i = v.lastIndexOf(':')
    const o = v.lastIndexOf('/')
    const s = ~i ? i + 1 : 0
    const e = ~o ? o + 1 : v.length
    return [
      v.slice(0, s), // 变体前缀
      v.slice(s, e), // 主样式
      v.slice(e), // 透明度
    ]
  })

  return [
    pattern,
    ([_, modifier, suffix, o]: RegExpMatchArray) => {
      // 如果是变体，只返回基础预设与 dark 的情况
      const isVariant = modifier?.includes(':')
      if (isVariant) {
        values = values.filter(([v]) => !v || v === 'dark:')
      }

      const res = values.map(([variant, token, opacity]) => {
        return `${variant}${modifier || defaultModifier}${token}${suffix}${o || opacity}`
      }).join(' ')

      return isVariant ? res : `${res} ${extra}`
    },
  ] as const
}
