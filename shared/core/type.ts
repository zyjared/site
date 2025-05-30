/**
 * 检查值是否为数组类型
 * @param value - 待检查的值
 * @returns 是否为数组
 */
export const isArray = Array.isArray

/**
 * 检查值是否为字符串类型
 * @param value - 待检查的值
 * @returns 是否为字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * 检查值是否为有限有效数值（非NaN、Infinity、-Infinity）
 * @param value - 待检查的值
 * @returns 是否为有限有效数值
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
    && !Number.isNaN(value)
    && Number.isFinite(value)
}

/**
 * 检查值是否为布尔类型
 * @param value - 待检查的值
 * @returns 是否为布尔值
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 检查值是否为函数类型
 * @param value - 待检查的值
 * @returns 是否为函数
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
  return typeof value === 'function'
}

/**
 * 检查值是否为对象类型（非原始值，排除 null）
 * @param value - 待检查的值
 * @returns 是否为对象
 */
export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object'
}

/**
 * 检查值是否为纯粹对象（通过字面量或 Object 构造）
 * @param value - 待检查的值
 * @returns 是否为纯粹对象
 *
 * @example
 * ```
 * isPlainObject({}); // true
 * isPlainObject(new Object()); // true
 * isPlainObject(Object.create(null)); // true
 * isPlainObject([]); // false
 * isPlainObject(new Date()); // false
 * isPlainObject(null); // false
 * ```
 */
/**
 * 检查值是否为纯粹对象（通过字面量或 Object 构造）
 * @param value - 待检查的值
 * @returns 是否为纯粹对象
 */
export function isPlainObject(value: unknown): value is Record<PropertyKey, unknown> {
  if (typeof value !== 'object' || value === null)
    return false

  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

/**
 * 检查值是否为空状态
 * 支持类型：null/undefined/空字符串/空数组/空对象/空集合
 * @param value - 待检查的值
 * @returns 是否为空
 *
 * @example
 * ```
 * isEmpty(null);        // true
 * isEmpty(undefined);   // true
 * isEmpty('');          // true
 * isEmpty([]);          // true
 * isEmpty({});          // true
 * isEmpty(new Map());   // true
 * isEmpty(new Set());   // true
 * ```
 */
export function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined)
    return true

  if (isString(value) || isArray(value))
    return value.length === 0

  if (isPlainObject(value))
    return Reflect.ownKeys(value).length === 0

  if (value instanceof Map || value instanceof Set)
    return value.size === 0

  return false
}

/**
 * 获取值的精确类型标签
 * @param value - 待检查的值
 * @returns 标准类型标签（如 "Array", "Date", "Object"）
 */
export function getTypeTag(value: unknown): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}

/**
 * 检查值是否为 Promise 对象
 * @param value - 待检查的值
 * @returns 是否为Promise
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  return !!value
    && (typeof value === 'object' || typeof value === 'function')
    && typeof (value as PromiseLike<T>).then === 'function'
}

/**
 * 检查值是否为 Error 实例
 * @param value - 待检查的值
 * @returns 是否为Error
 */
export function isError(value: unknown): value is Error {
  return value instanceof Error
}
