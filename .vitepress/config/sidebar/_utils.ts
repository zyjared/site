import type { DefaultTheme } from 'vitepress'

type Sidebar = DefaultTheme.Sidebar
type SidebarItem = DefaultTheme.SidebarItem
interface SidebarGroup {
  base: string
  items: SidebarItem[]
}

interface DefineSidebarOptions {
  /**
   * 是否规范 base
   *
   * @default false
   */
  format?: boolean

  base?: string
}

/**
 *  `options.base || options.format` 时，会处理 base（默认跳过）。
 *
 * 如果需要嵌套使用（如：返回值作为参数），在最外层开启。
 */
export function defineSidebar<T extends Sidebar | SidebarItem | SidebarGroup>(sidebar: T, options: DefineSidebarOptions = {}): T {
  const { format = false, base } = options

  if (!base && !format)
    return sidebar

  const nbase = base ? normalizeBase(base) : undefined

  // SidebarItem[] || SidebarGroup
  if (
    Array.isArray(sidebar)
    || (Object.hasOwn(sidebar, 'base') && Object.hasOwn(sidebar, 'items'))
  ) {
    formatSidebarBase(sidebar, { base: nbase })
    return sidebar
  }

  // DefaultTheme.SidebarMulti
  return Object.entries(sidebar).reduce((prev, [k, v]) => {
    const p = normalizeBase(base, k)
    formatSidebarBase(v, { base: nbase })
    prev[p] = v
    return prev
  }, {} as T)
}

/**
 * 仅当有 base 项时，规范 base
 *
 * 如果 base 以规范后的父级 base 开头，则跳过
 */
function formatSidebarBase<T extends SidebarItem | SidebarGroup | SidebarItem[]>(
  item: T,
  parent?: SidebarItem | SidebarGroup,
) {
  if (Array.isArray(item)) {
    item.forEach((i) => {
      formatSidebarBase(i, parent)
    })
  }
  else {
    if (item.base) {
      const base = normalizeBase(item.base)

      // 是否已处理（设置时就已考虑过了）
      const parentIsFormated = parent && parent.base
      const isFormated = parentIsFormated && base.startsWith(parent.base)

      item.base = isFormated || !parentIsFormated ? base : parent.base + base.slice(1)
    }

    if (item.items) {
      item.items.forEach((i) => {
        formatSidebarBase(i, item)
      })
    }
  }
}

function normalizeLink(...paths: string[]): string {
  return (
    `/${
      paths
        .filter(Boolean)
        .flatMap(p => p.split('/'))
        .filter(Boolean)
        .join('/')
    }`
  )
}

function normalizeBase(...paths: string[]): string {
  return `${normalizeLink(...paths)}/`
}
