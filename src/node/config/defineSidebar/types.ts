import type { DefaultTheme } from 'vitepress'
import { normalizeLink } from './link'

export type Item = DefaultTheme.SidebarItem
export type Multi = DefaultTheme.SidebarMulti

export interface Group {
  base: string
  items: Item[]
}

export type Sidebar = Group | (Group | Item)[]
export type SidebarMulti = Multi

type SidebarArg = Sidebar | Item | SidebarMulti

export function isItemArray(sidebar: SidebarArg): sidebar is Item[] {
  return Array.isArray(sidebar)
}

export function isGroup(sidebar: SidebarArg): sidebar is Group {
  return Object.hasOwn(sidebar, 'base') && isItemArray((sidebar as Item).items)
}

export function isSidebarMulti(sidebar: SidebarArg): sidebar is SidebarMulti {
  return !isItemArray(sidebar) && !isGroup(sidebar)
}

export function isNestedBase(base: string, root?: string): boolean {
  const nroot = normalizeLink(root)
  return nroot.length > 1 && base.startsWith(nroot)
}
