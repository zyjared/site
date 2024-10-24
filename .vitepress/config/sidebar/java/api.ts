import type { DefaultTheme } from 'vitepress'
import { sidebarBaseBuilder } from '../_utils'

export default function api(): DefaultTheme.SidebarItem[] {
  const { resolveBase } = sidebarBaseBuilder('/java/api/')
  return [
    {
      text: 'Collection',
      base: resolveBase('Collection'),
      collapsed: false,
      items: [
        { text: 'ArrayList', link: 'ArrayList' },
      ],
    },
    {
      text: 'Stream',
      base: resolveBase('Stream'),
      collapsed: false,
      items: [
        { text: 'Stream 介绍', link: 'Stream-介绍' },
      ],
    },
    {
      text: 'I/O',
      base: resolveBase('IO'),
      collapsed: false,
      items: [
        { text: 'I/O 介绍', link: 'IO-介绍' },
      ],
    },
    {
      text: '日期时间',
      base: resolveBase('日期时间'),
      collapsed: false,
      items: [
        { text: '日期时间介绍', link: '日期时间-介绍' },

      ],

    },
    {
      text: '正则表达式',
      base: resolveBase('正则表达式'),
      collapsed: false,
      items: [
        { text: '正则表达式介绍', link: '正则表达式介绍' },

      ],
    },
    {
      text: '反射',
      base: resolveBase('反射'),
      collapsed: false,
      items: [
        { text: '反射介绍', link: '反射介绍' },

      ],
    },
    {
      text: '更多 api',
      base: resolveBase('更多-api'),
      collapsed: false,
      items: [
        { text: '方法句柄介绍', link: '方法句柄介绍' },
        { text: '使用 JDK 库的安全基础知识', link: '使用JDK库的安全基础' },
        { text: '虚拟线程', link: '虚拟线程' },
      ],
    },
  ]
}
