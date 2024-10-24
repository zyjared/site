import type { DefaultTheme } from 'vitepress'
import examples from './examples'
import java from './java'

export const sidebar: DefaultTheme.SidebarMulti = {
  ...examples,
  ...java,
}
