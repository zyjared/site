import { describe, expect, it } from 'vitest'
import {
  getOwnValue,
  hasKey,
  hasOwnKey,
} from '../core/object'

describe('对象工具函数', () => {
  describe('hasOwnKey', () => {
    it('识别自身属性', () => {
      const obj = { a: 1, b: 2 }
      expect(hasOwnKey(obj, 'a')).toBe(true)
      expect(hasOwnKey(obj, 'b')).toBe(true)
    })

    it('拒绝原型链属性', () => {
      const obj = {}
      expect(hasOwnKey(obj, 'toString')).toBe(false)
      expect(hasOwnKey(obj, 'hasOwnProperty')).toBe(false)
    })

    it('拒绝不存在的属性', () => {
      const obj = { a: 1 }
      expect(hasOwnKey(obj, 'b')).toBe(false)
      expect(hasOwnKey(obj, 'c')).toBe(false)
    })

    it('处理Symbol键', () => {
      const sym = Symbol('test')
      const obj = { [sym]: 'value' }
      expect(hasOwnKey(obj, sym)).toBe(true)
    })
  })

  describe('hasKey', () => {
    it('识别自身属性', () => {
      const obj = { a: 1 }
      expect(hasKey(obj, 'a')).toBe(true)
    })

    it('识别原型链属性', () => {
      const obj = {}
      expect(hasKey(obj, 'toString')).toBe(true)
    })

    it('拒绝不存在的属性', () => {
      const obj = { a: 1 }
      expect(hasKey(obj, 'b')).toBe(false)
    })

    it('处理非对象值', () => {
      expect(hasKey(null, 'toString')).toBe(false)
      expect(hasKey(undefined, 'toString')).toBe(false)
      expect(hasKey(123, 'toString')).toBe(false)
    })

    it('处理Symbol键', () => {
      const sym = Symbol('test')
      const obj = { [sym]: 'value' }
      expect(hasKey(obj, sym)).toBe(true)
    })
  })

  describe('getOwnValue', () => {
    it('获取存在的属性', () => {
      const obj = { a: 1 }
      expect(getOwnValue(obj, 'a')).toBe(1)
    })

    it('返回undefined对于不存在的属性', () => {
      const obj = { a: 1 }
      expect(getOwnValue(obj, 'b')).toBeUndefined()
    })

    it('处理数组', () => {
      const arr = [1, 2, 3]

      expect(getOwnValue(arr, 0)).toBe(1)
      expect(getOwnValue(arr, 3)).toBeUndefined()
    })
  })
})
