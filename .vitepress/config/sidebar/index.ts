import type { DefaultTheme } from 'vitepress'
import dataStructure from './data-structure'
import examples from './examples'
import java from './java'

export const sidebar: DefaultTheme.SidebarMulti = {
  ...examples,
  ...dataStructure,
  ...java,
}
