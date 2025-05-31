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

/**
 * 扩展对象键
 * @param obj - 要修改的对象
 * @param key - 要添加的键名
 * @param value - 要添加的值
 * @returns 原始对象引用
 */
export function augmentKey<T, K extends PropertyKey, V>(
  obj: T,
  key: K,
  value: V,
) {
  (obj as any)[key] = value
  return obj as T & Record<K, V>
}

/**
 * 定义对象属性（即使键不存在），返回设置的属性值
 *
 * @param obj - 目标对象
 * @param key - 要定义/设置的键
 * @param value - 键对应的值
 * @returns 设置的属性值（类型安全）
 */
export function defineKey<T extends object, K extends PropertyKey, V>(
  obj: T,
  key: K,
  value: V,
): V {
  (obj as any)[key] = value
  return value
}

/**
 * 从对象中选择指定的键
 * @param obj - 源对象
 * @param keys - 要选择的键数组
 * @returns 包含所选键值对的新对象
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]) {
  return keys.reduce((acc, key) => {
    if (hasOwnKey(obj, key))
      acc[key] = obj[key]
    return acc
  }, {} as Pick<T, K>)
}
