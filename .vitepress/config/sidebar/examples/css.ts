import type { DefaultTheme } from 'vitepress'
import { sidebarBaseBuilder } from '../_utils'

export default function css(): DefaultTheme.SidebarItem[] {
  const { resolveBase } = sidebarBaseBuilder('/examples/')
  return [
    {
      text: 'CSS',
      base: resolveBase('css'),
      collapsed: false,
      items: [
        { text: '计数器', link: '计数器' },
        { text: 'clamp 函数', link: 'clamp 函数' },
        { text: '滚动吸附', link: '滚动吸附' },
        { text: '玻璃效果', link: '玻璃效果' },
        { text: '容器阴影', link: '容器阴影' },
        { text: 'border 渐变', link: 'border 渐变' },
        { text: '文字渐变', link: '文字渐变' },
        { text: '段落渐隐', link: '段落渐隐' },
        { text: 'focus-within', link: 'focus-within' },
      ],
    },
  ]
}
