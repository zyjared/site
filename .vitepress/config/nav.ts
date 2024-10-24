import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '示例',
    link: '/examples/',
  },
  {
    text: '前端',
    items: [
      { text: 'MDN', link: 'https://developer.mozilla.org/zh-CN/' },
    ],
  },
  {
    text: 'Java',
    items: [
      { text: '基础', link: '/java/learn/' },
    //   { text: 'API', link: '/java/api/' },
    //   { text: '工具链', link: '/java/工具链/' },
    //   { text: 'JDBC', link: '/java/JDBC/' },
    //   { text: 'Web', link: '/java/web/' },
    //   { text: '基础设计模式', link: '/java/基础设计模式/' },
    //   { text: 'Spring', link: '/java/spring/' },
    ],
  },
]
