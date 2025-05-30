import { describe, expect, expectTypeOf, it } from 'vitest'
import {
  getTypeTag,
  isArray,
  isBoolean,
  isEmpty,
  isError,
  isFunction,
  isNumber,
  isObject,
  isPlainObject,
  isPromise,
  isString,
} from '../core/type'

describe('类型检查工具函数', () => {
  describe('isArray', () => {
    it('正确识别数组', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
      expect(isArray(Array.from({ length: 5 }))).toBe(true)
    })

    it('拒绝非数组类型', () => {
      expect(isArray({})).toBe(false)
      expect(isArray('array')).toBe(false)
      expect(isArray(null)).toBe(false)
      expect(isArray(123)).toBe(false)
    })
  })

  describe('isString', () => {
    it('正确识别字符串', () => {
      expect(isString('')).toBe(true)
      expect(isString('hello')).toBe(true)
      expect(isString(String(123))).toBe(true)
    })

    it('拒绝非字符串类型', () => {
      expect(isString(123)).toBe(false)
      expect(isString(true)).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
    })
  })

  describe('isNumber', () => {
    it('识别有效数字', () => {
      expect(isNumber(0)).toBe(true)
      expect(isNumber(123.45)).toBe(true)
      expect(isNumber(Number('123'))).toBe(true)
      expect(isNumber(-42)).toBe(true)
    })

    it('拒绝无效数字', () => {
      expect(isNumber(Number.NaN)).toBe(false)
      expect(isNumber(Infinity)).toBe(false)
      expect(isNumber(-Infinity)).toBe(false)
      expect(isNumber('123')).toBe(false)
      expect(isNumber(null)).toBe(false)
      expect(isNumber(undefined)).toBe(false)
    })

    it('处理边界值', () => {
      expect(isNumber(Number.MAX_SAFE_INTEGER)).toBe(true)
      expect(isNumber(Number.MIN_SAFE_INTEGER)).toBe(true)
      expect(isNumber(Number.MAX_VALUE)).toBe(true)
      expect(isNumber(Number.MIN_VALUE)).toBe(true)
    })
  })

  describe('isBoolean', () => {
    it('正确识别布尔值', () => {
      expect(isBoolean(true)).toBe(true)
      expect(isBoolean(false)).toBe(true)
      expect(isBoolean(Boolean(1))).toBe(true)
    })

    it('拒绝非布尔类型', () => {
      expect(isBoolean(0)).toBe(false)
      expect(isBoolean('true')).toBe(false)
      expect(isBoolean(null)).toBe(false)
      expect(isBoolean(undefined)).toBe(false)
    })
  })

  describe('isFunction', () => {
    it('正确识别函数', () => {
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(() => {})).toBe(true)
      expect(isFunction(class {})).toBe(true)
      expect(isFunction(Array.isArray)).toBe(true)
    })

    it('拒绝非函数类型', () => {
      expect(isFunction({})).toBe(false)
      expect(isFunction('function')).toBe(false)
      expect(isFunction(123)).toBe(false)
    })
  })

  describe('isObject', () => {
    it('正确识别对象', () => {
      expect(isObject({})).toBe(true)
      expect(isObject([])).toBe(true)
      expect(isObject(new Date())).toBe(true)
      expect(isObject(/regex/)).toBe(true)
    })

    it('拒绝原始值和null', () => {
      expect(isObject(null)).toBe(false)
      expect(isObject(123)).toBe(false)
      expect(isObject('string')).toBe(false)
      expect(isObject(true)).toBe(false)
      expect(isObject(undefined)).toBe(false)
    })
  })

  describe('isPlainObject', () => {
    it('识别纯粹对象', () => {
      expect(isPlainObject({})).toBe(true)
      expect(isPlainObject(new Object())).toBe(true)
      expect(isPlainObject(Object.create(null))).toBe(true)
    })

    it('排除非纯粹对象', () => {
      expect(isPlainObject([])).toBe(false)
      expect(isPlainObject(new Date())).toBe(false)
      expect(isPlainObject(() => {})).toBe(false)
      expect(isPlainObject(null)).toBe(false)
    })
  })

  describe('isEmpty', () => {
    it('识别空值', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty('')).toBe(true)
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
      expect(isEmpty(new Map())).toBe(true)
      expect(isEmpty(new Set())).toBe(true)
    })

    it('拒绝非空值', () => {
      expect(isEmpty('text')).toBe(false)
      expect(isEmpty([1])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
      expect(isEmpty(new Map([['key', 'value']]))).toBe(false)
      expect(isEmpty(new Set([1]))).toBe(false)
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty(false)).toBe(false)
    })
  })

  describe('getTypeTag', () => {
    it('返回正确的类型标签', () => {
      expect(getTypeTag([])).toBe('Array')
      expect(getTypeTag({})).toBe('Object')
      expect(getTypeTag(new Date())).toBe('Date')
      expect(getTypeTag(/regex/)).toBe('RegExp')
      expect(getTypeTag('')).toBe('String')
      expect(getTypeTag(123)).toBe('Number')
      expect(getTypeTag(true)).toBe('Boolean')
      expect(getTypeTag(null)).toBe('Null')
      expect(getTypeTag(undefined)).toBe('Undefined')
      expect(getTypeTag(() => {})).toBe('Function')
      expect(getTypeTag(new Map())).toBe('Map')
      expect(getTypeTag(new Set())).toBe('Set')
    })
  })

  describe('isPromise', () => {
    it('识别Promise对象', () => {
      expect(isPromise(Promise.resolve())).toBe(true)
      expect(isPromise({ then: () => {}, catch: () => {} })).toBe(true)
      expect(isPromise(new Promise(() => {}))).toBe(true)
    })

    it('拒绝非Promise对象', () => {
      expect(isPromise({})).toBe(false)
      expect(isPromise(() => {})).toBe(false)
      expect(isPromise('promise')).toBe(false)
      expect(isPromise(null)).toBe(false)
    })
  })

  describe('isError', () => {
    it('识别Error实例', () => {
      expect(isError(new Error('err'))).toBe(true)
      expect(isError(new TypeError('err'))).toBe(true)
      expect(isError(new SyntaxError('err'))).toBe(true)
    })

    it('拒绝非Error对象', () => {
      expect(isError({})).toBe(false)
      expect(isError('error')).toBe(false)
      expect(isError(null)).toBe(false)
      expect(isError(new Date())).toBe(false)
    })
  })
})
