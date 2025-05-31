/**
 * `String.raw` 的别名。
 * 用于创建原始字符串，不处理转义字符。
 *
 * @param template 模板字符串
 * @param substitutions 替换值
 * @returns 原始字符串
 *
 * @example
 * ```ts
 * r`Hello \n world!'
 * // => 'Hello \\n world!'
 * ```
 */
export const r = String.raw

/**
 * 将字符串的首字母转为大写
 * @param str 输入字符串
 * @returns 首字母大写的字符串
 */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 将字符串的首字母转为小写
 * @param str 输入字符串
 * @returns 首字母小写的字符串
 */
export function uncapitalize(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

/**
 * 判断字符串是否以大写字母开头
 * @param str 输入字符串
 * @returns 如果字符串以大写字母开头则返回true，否则返回false
 */
export function isCapitalized(str: string): boolean {
  if (!str || str.length === 0) {
    return false
  }
  const firstChar = str.charAt(0)
  // 检查第一个字符是否为字母，然后再比较大小写
  if (firstChar.toLowerCase() === firstChar.toUpperCase()) {
    // 不是字母字符，所以不能按通常意义上的"大写"来判断
    return false
  }
  return firstChar === firstChar.toUpperCase()
}

/**
 * 截断字符串到指定长度，超出部分用省略号或指定后缀替代
 * @param str 输入字符串
 * @param maxLength 最大长度
 * @param suffix 超出长度后添加的后缀，默认为'...'
 * @returns 截断后的字符串
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) {
    return str
  }
  return str.substring(0, maxLength - suffix.length) + suffix
}
