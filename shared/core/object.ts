/**
 * 检查对象自身属性是否包含指定键（不包含原型链）
 * @param obj - 要检查的对象
 * @param key - 要检查的键名
 * @returns 是否包含该键
 */
export function hasOwnKey<T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
): obj is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * 检查对象是否包含指定键（包括原型链）
 * @param obj - 要检查的对象
 * @param key - 要检查的键名
 * @returns 是否包含该键
 */
export function hasKey<T, K extends PropertyKey>(
  obj: T,
  key: K,
): obj is T & (K extends keyof T ? T : Record<K, unknown>) {
  if (obj === null || typeof obj !== 'object')
    return false
  return key in (obj as object)
}

/**
 * 类型安全的属性访问器
 * @param obj - 要访问的对象
 * @param key - 要访问的键名
 * @returns 属性值或 `undefined`
 */
export function getOwnValue<T extends Record<string | number | symbol, any>>(
  obj: T,
  key: PropertyKey,
): T[keyof T] | undefined {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key as keyof T]
  }

  return undefined
}
