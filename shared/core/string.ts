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

/**
 * 将字符串转换为短横线分隔格式（kebab-case）
 * @param str 输入字符串
 * @returns 短横线分隔格式的字符串
 */
export function kebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // 找出所有小写字母后面紧跟大写字母的位置
    .replace(/[_.]+/g, '-') // 修复：将下划线和点替换为短横线
    .replace(/[^\w\-]+/g, '-') // 将所有非单词字符替换为短横线
    .replace(/-{2,}/g, '-') // 将多个连续短横线替换为单个短横线
    .toLowerCase()
}

/**
 * 将字符串转换为驼峰命名格式（camelCase）
 * @param str 输入字符串
 * @returns 驼峰命名格式的字符串
 */
export function camelCase(str: string): string {
  return str
    .replace(/[^\w\s-]/g, '') // 移除特殊字符，保留连字符和空格
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, match => match.toLowerCase()) // 确保第一个字符小写
}

/**
 * 将字符串转换为下划线分隔格式（snake_case）
 * @param str 输入字符串
 * @returns 下划线分隔格式的字符串
 */
export function snakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/\W+/g, '_')
    .replace(/_{2,}/g, '_')
    .toLowerCase()
}

/**
 * 转义HTML特殊字符，防止 XSS 攻击
 * @param str 输入字符串
 * @returns 转义后的HTML安全字符串
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * 反转义HTML特殊字符
 * @param str 已转义的HTML字符串
 * @returns 原始字符串
 */
export function unescapeHtml(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, '\'')
}

/**
 * 判断字符串是否为有效的电子邮件地址格式
 * @param str 输入字符串
 * @returns 如果是有效的电子邮件地址则返回true，否则返回false
 */
export function isEmail(str: string): boolean {
  // 修复：使用更严格的电子邮件验证正则表达式
  const emailRegex = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/
  return emailRegex.test(str)
}

/**
 * 计算字符串中的单词数量
 * @param str 输入字符串
 * @returns 单词数量
 */
export function wordCount(str: string): number {
  const trimed = str.trim()
  if (!trimed) {
    return 0
  }
  return trimed.split(/\s+/).length
}

/**
 * 遮蔽字符串的一部分，通常保留首尾部分可见
 * @param str 要遮蔽的字符串
 * @param visibleStart 开头保留可见的字符数
 * @param visibleEnd 结尾保留可见的字符数
 * @param maskChar 用于遮蔽的字符，默认为'*'
 * @returns 遮蔽后的字符串
 */
export function mask(
  str: string,
  visibleStart: number,
  visibleEnd: number,
  maskChar: string = '*',
): string {
  const len = str.length
  if (visibleStart < 0)
    visibleStart = 0
  if (visibleEnd < 0)
    visibleEnd = 0
  if (visibleStart + visibleEnd >= len)
    return str // 如果可见部分超过总长度，则返回原字符串

  const start = str.substring(0, visibleStart)
  const end = str.substring(len - visibleEnd)
  const maskedPart = maskChar.repeat(len - visibleStart - visibleEnd)

  return start + maskedPart + end
}
