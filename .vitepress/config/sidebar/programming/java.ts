import { defineSidebar } from '../_utils'

export const javaLearn = defineSidebar({
  base: '/java/learn/',
  items: [
    {
      text: '开始使用',
      base: '开始使用',
      collapsed: false,
      items: [
        { text: '开发环境', link: '开发环境' },
        { text: '面向对象', link: '面向对象' },
      ],
    },
    {
      text: '基础',
      base: '基础',
      collapsed: false,
      items: [
        { text: '变量', link: '变量' },
        { text: '基本数据类型', link: '基本数据类型' },
        { text: '数组', link: '数组' },
        { text: '类型标识符 var', link: '类型标识符 var' },
        { text: '运算符', link: '运算符' },
        { text: '控制流语句', link: '控制流语句' },
      ],
    },
    {
      text: '类和对象',
      base: '类和对象',
      collapsed: false,
      items: [
        { text: '创建类', link: '创建类' },
        { text: '定义方法', link: '定义方法' },
        { text: '构造函数', link: '构造函数' },
        { text: '调用方法和构造函数', link: '调用方法和构造函数' },
        { text: '类的更多特性', link: '类的更多特性' },
        { text: '嵌套类', link: '嵌套类' },
        { text: '枚举', link: '枚举' },
      ],
    },

    {
      text: 'Numbers 和 Strings',
      base: 'Numbers 和 Strings',
      collapsed: false,
      items: [
        { text: 'Numbers', link: 'Numbers' },
        { text: 'Characters', link: 'Characters' },
        { text: 'Strings', link: 'Strings' },
        { text: 'String Builders', link: 'String Builders' },
        { text: 'Autoboxing 和 Unboxing', link: 'Autoboxing 和 Unboxing' },
      ],
    },
    {
      text: '继承 Inheritance',
      base: '继承 Inheritance',
      collapsed: false,
      items: [
        { text: '继承介绍', link: '继承介绍' },
        { text: '覆写', link: '覆写' },
        { text: '多态', link: '多态' },
        { text: '超类', link: '超类' },
        { text: '抽象类', link: '抽象类' },
      ],
    },
    {
      text: '接口 Interface',
      base: '接口 Interface',
      collapsed: false,
      items: [
        { text: '接口介绍', link: '接口介绍' },
        { text: '实现接口', link: '实现接口' },
        { text: '接口作为类型', link: '接口作为类型' },
      ],
    },
    {
      text: '泛型',
      base: '泛型',
      collapsed: false,
      items: [
        { text: '泛型介绍', link: '泛型介绍' },
        { text: '类型推断', link: '类型推断' },
        { text: '通配符', link: '通配符' },
        { text: '类型擦除', link: '类型擦除' },
        { text: '泛型限制', link: '泛型限制' },
      ],
    },
    {
      text: '更多主题',
      base: '更多主题',
      collapsed: false,
      items: [
        { text: 'Record', link: 'Record' },
        { text: 'Lambda 表达式', link: 'Lambda 表达式' },
        { text: 'Annotations', link: 'Annotations' },
        { text: '包', link: '包' },
        { text: '模式匹配', link: '模式匹配' },
        { text: '异常 Exception', link: '异常 Exception' },
        { text: '函数式风格的重构', link: '函数式风格的重构' },
      ],
    },
  ],
})

export const javaApi = defineSidebar({
  base: '/java/api',
  items: [
    {
      text: 'Collection',
      base: 'Collection',
      collapsed: false,
      items: [
        { text: 'ArrayList', link: 'ArrayList' },
      ],
    },
    {
      text: 'Stream',
      base: 'Stream',
      collapsed: false,
      items: [
        { text: 'Stream 介绍', link: 'Stream-介绍' },
      ],
    },
    {
      text: 'I/O',
      base: 'IO',
      collapsed: false,
      items: [
        { text: 'I/O 介绍', link: 'IO-介绍' },
      ],
    },
    {
      text: '日期时间',
      base: '日期时间',
      collapsed: false,
      items: [
        { text: '日期时间介绍', link: '日期时间-介绍' },

      ],

    },
    {
      text: '正则表达式',
      base: '正则表达式',
      collapsed: false,
      items: [
        { text: '正则表达式介绍', link: '正则表达式介绍' },

      ],
    },
    {
      text: '反射',
      base: '反射',
      collapsed: false,
      items: [
        { text: '反射介绍', link: '反射介绍' },

      ],
    },
    {
      text: '更多 api',
      base: '更多-api',
      collapsed: false,
      items: [
        { text: '方法句柄介绍', link: '方法句柄介绍' },
        { text: '使用 JDK 库的安全基础知识', link: '使用JDK库的安全基础' },
        { text: '虚拟线程', link: '虚拟线程' },
      ],
    },
  ],
})