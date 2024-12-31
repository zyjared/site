import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [

  {
    text: '编程',
    items: [
      {
        text: '计算机基础',
        items: [
          {
            text: '数据结构',
            link: '/data-structure/README',
          },
        ],
      },
      {
        text: '编程语言',
        items: [
          { text: 'Java', link: '/java/' },
          {
            text: 'C',
            link: 'https://zh.cppreference.com/w/首页',
          },
          {
            text: 'Python',
            link: 'https://docs.python.org/zh-cn/3/',
          },
          {
            text: 'Rust',
            link: 'https://kaisery.github.io/trpl-zh-cn/',
          },

        ],
      },

    ],
  },

  {
    text: '前端',
    items: [
      {
        text: 'CSS 示例',
        link: '/examples/css/',
      },
      {
        text: 'MDN',
        link: 'https://developer.mozilla.org/zh-CN/',
      },
    ],
  },

]
