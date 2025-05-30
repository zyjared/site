import { describe, expect, it } from 'vitest'
import {
  camelCase,
  capitalize,
  escapeHtml,
  isCapitalized,
  isEmail,
  kebabCase,
  mask,
  r,
  snakeCase,
  truncate,
  uncapitalize,
  unescapeHtml,
  wordCount,
} from '../core/string'

describe('字符串工具函数', () => {
  // capitalize 函数测试
  describe('capitalize', () => {
    it('将首字母转为大写', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('world')).toBe('World')
    })

    it('保持已经大写的首字母不变', () => {
      expect(capitalize('Hello')).toBe('Hello')
    })

    it('处理空字符串', () => {
      expect(capitalize('')).toBe('')
    })

    it('处理非字母开头的字符串', () => {
      expect(capitalize('123abc')).toBe('123abc')
    })
  })

  // uncapitalize 函数测试
  describe('uncapitalize', () => {
    it('将首字母转为小写', () => {
      expect(uncapitalize('Hello')).toBe('hello')
      expect(uncapitalize('World')).toBe('world')
    })

    it('保持已经小写的首字母不变', () => {
      expect(uncapitalize('hello')).toBe('hello')
    })

    it('处理空字符串', () => {
      expect(uncapitalize('')).toBe('')
    })

    it('处理非字母开头的字符串', () => {
      expect(uncapitalize('123abc')).toBe('123abc')
    })
  })

  // isCapitalized 函数测试
  describe('isCapitalized', () => {
    it('正确识别大写开头的字符串', () => {
      expect(isCapitalized('Hello')).toBe(true)
      expect(isCapitalized('World')).toBe(true)
    })

    it('正确识别非大写开头的字符串', () => {
      expect(isCapitalized('hello')).toBe(false)
      expect(isCapitalized('world')).toBe(false)
    })

    it('处理空字符串', () => {
      expect(isCapitalized('')).toBe(false)
    })

    it('处理非字母开头的字符串', () => {
      expect(isCapitalized('123abc')).toBe(false)
    })
  })

  // truncate 函数测试
  describe('truncate', () => {
    it('截断超出长度的字符串', () => {
      expect(truncate('hello world', 5)).toBe('he...')
      expect(truncate('hello world', 8, '...')).toBe('hello...')
    })

    it('保持不超出长度的字符串不变', () => {
      expect(truncate('hello', 10)).toBe('hello')
    })

    it('支持自定义后缀', () => {
      expect(truncate('hello world', 7, '***')).toBe('hell***')
    })
  })

  // kebabCase 函数测试
  describe('kebabCase', () => {
    it('将驼峰命名转为短横线分隔', () => {
      expect(kebabCase('helloWorld')).toBe('hello-world')
      expect(kebabCase('HelloWorld')).toBe('hello-world')
    })

    it('处理包含空格的字符串', () => {
      expect(kebabCase('hello world')).toBe('hello-world')
    })

    it('处理包含特殊字符的字符串', () => {
      expect(kebabCase('hello_world')).toBe('hello-world')
      expect(kebabCase('hello.world')).toBe('hello-world')
    })

    it('处理连续的非单词字符', () => {
      expect(kebabCase('hello..world')).toBe('hello-world')
      expect(kebabCase('hello--world')).toBe('hello-world')
    })
  })

  // camelCase 函数测试
  describe('camelCase', () => {
    it('将短横线分隔转为驼峰命名', () => {
      expect(camelCase('hello-world')).toBe('helloWorld')
    })

    it('处理包含空格的字符串', () => {
      expect(camelCase('hello world')).toBe('helloWorld')
    })

    it('处理包含下划线的字符串', () => {
      expect(camelCase('hello_world')).toBe('helloWorld')
    })

    it('确保首字母小写', () => {
      expect(camelCase('Hello-World')).toBe('helloWorld')
    })
  })

  // snakeCase 函数测试
  describe('snakeCase', () => {
    it('将驼峰命名转为下划线分隔', () => {
      expect(snakeCase('helloWorld')).toBe('hello_world')
      expect(snakeCase('HelloWorld')).toBe('hello_world')
    })

    it('处理包含空格的字符串', () => {
      expect(snakeCase('hello world')).toBe('hello_world')
    })

    it('处理包含短横线的字符串', () => {
      expect(snakeCase('hello-world')).toBe('hello_world')
    })

    it('处理连续的非单词字符', () => {
      expect(snakeCase('hello..world')).toBe('hello_world')
      expect(snakeCase('hello--world')).toBe('hello_world')
    })
  })

  // escapeHtml 和 unescapeHtml 函数测试
  describe('escapeHtml 和 unescapeHtml', () => {
    it('正确转义 HTML 特殊字符', () => {
      expect(escapeHtml('<div>Hello & World</div>')).toBe('&lt;div&gt;Hello &amp; World&lt;/div&gt;')
    })

    it('正确反转义 HTML 特殊字符', () => {
      expect(unescapeHtml('&lt;div&gt;Hello &amp; World&lt;/div&gt;')).toBe('<div>Hello & World</div>')
    })

    it('escapeHtml 和 unescapeHtml 是互逆操作', () => {
      const original = '<div>Hello & World</div>'
      expect(unescapeHtml(escapeHtml(original))).toBe(original)
    })
  })

  // isEmail 函数测试
  describe('isEmail', () => {
    it('正确识别有效的电子邮件地址', () => {
      expect(isEmail('test@example.com')).toBe(true)
      expect(isEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('正确识别无效的电子邮件地址', () => {
      expect(isEmail('test')).toBe(false)
      expect(isEmail('test@')).toBe(false)
      expect(isEmail('test@domain')).toBe(false)
      expect(isEmail('@domain.com')).toBe(false)
    })

    it('使用更严格的电子邮件验证', () => {
      // 测试您更新的正则表达式
      expect(isEmail('test@domain.com')).toBe(true)
      expect(isEmail('test@domain..com')).toBe(false) // 连续的点是无效的
      expect(isEmail('test@.domain.com')).toBe(false) // @后紧跟点是无效的
    })
  })

  // wordCount 函数测试
  describe('wordCount', () => {
    it('正确计算单词数量', () => {
      expect(wordCount('hello world')).toBe(2)
      expect(wordCount('hello  world  test')).toBe(3)
    })

    it('处理空字符串', () => {
      expect(wordCount('')).toBe(0)
      expect(wordCount('   ')).toBe(0)
    })

    it('处理前后有空格的字符串', () => {
      expect(wordCount('  hello world  ')).toBe(2)
    })
  })

  // mask 函数测试
  describe('mask', () => {
    it('正确遮蔽字符串的中间部分', () => {
      expect(mask('1234567890', 4, 2)).toBe('1234****90')
      expect(mask('abcdefghij', 2, 2)).toBe('ab******ij')
    })

    it('支持自定义遮蔽字符', () => {
      expect(mask('1234567890', 4, 2, '#')).toBe('1234####90')
    })

    it('当可见部分超过总长度时，返回原字符串', () => {
      expect(mask('12345', 3, 3)).toBe('12345')
    })

    it('处理负数参数', () => {
      expect(mask('12345', -1, 2)).toBe('***45')
      expect(mask('12345', 2, -1)).toBe('12***')
    })
  })
})
