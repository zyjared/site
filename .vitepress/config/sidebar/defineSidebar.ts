import type { DefaultTheme } from 'vitepress'

type Item = DefaultTheme.SidebarItem
type Multi = DefaultTheme.SidebarMulti

interface Group {
  base: string
  items: Item[]
}

type Sidebar = Group | Group[] | Item[]
type SidebarMulti = Multi

interface Options {
  /**
   * 根目录
   */
  root?: string

  /**
   * base 是否需要嵌套处理
   *
   * @default true
   */
  nested?: boolean

  /**
   * 是否推断 text
   *
   * @default true
   */
  inferText?: boolean

}

/**
 * 统一定义 sidebar
 *
 * - 路径均为相对路径
 * - text 默认推断
 *
 * @param sidebar
 * @param options - 当有该参数时，将返回为 `SidebarMulti` 类型，即使为 `{}`
 * @param options.root - 根目录
 * @param options.nested - 所有 base 都视为相对路径后转为绝对路径（父级 base 遵循就近原则）
 */
export function defineSidebar<T extends Sidebar | SidebarMulti>(sidebar: T, options: Options): SidebarMulti
export function defineSidebar<T extends Sidebar | SidebarMulti>(sidebar: T): T
export function defineSidebar(
  sidebar: Sidebar | SidebarMulti,
  options?: Options,
) {
  if (!options) {
    return sidebar
  }

  const { root, nested = true, inferText = true } = options

  if (isSidebarMulti(sidebar)) {
    formatSidebarMulti(sidebar, { nested, root, inferText })
    return sidebar
  }

  return createSidebarMulti(Array.isArray(sidebar) ? sidebar : [sidebar], { nested, root, inferText })
}

//
// #region format
// ---------------------------------------

interface FormatOptions {
  root?: string
  nested?: boolean
  inferText?: boolean
}

function createSidebarMulti<T extends Item[] | Group[]>(sidebar: T, options: FormatOptions): SidebarMulti {
  const multi: Record<string, Group> = {}

  sidebar.forEach((item: Item | Group) => {
    const group = isGroup(item) ? item : { base: '/', items: [item] }

    const p = normalizeBase(options.root, group.base)
    if (multi[p]) {
      multi[p].items.push(...group.items)
    }
    else {
      multi[p] = group
    }
  })

  formatSidebarMulti(multi, options)

  return multi
}

function formatSidebarMulti(sidebar: SidebarMulti, options: FormatOptions) {
  const { root, nested, inferText } = options
  const keys = Object.keys(sidebar)

  keys.forEach((key) => {
    const items = sidebar[key]

    if (Object.hasOwn(sidebar, key)) {
      delete sidebar[key]
    }

    formatSidebar(items, { root, nested, inferText })

    const p = isNestedBase(key, root) ? normalizeBase(key) : normalizeBase(root, key)

    sidebar[p] = items
  })
}

function formatSidebar<T extends Item | Item[]>(
  sidebar: T,
  options: FormatOptions,
  parentBase: string = null,
) {
  if (isItemArray(sidebar)) {
    sidebar.forEach((item) => {
      formatSidebar(item, options, parentBase)
    })
    return
  }

  // nested
  if (sidebar.base) {
    sidebar.base = !options.nested || isNestedBase(sidebar.base, parentBase)
      ? normalizeBase(sidebar.base)
      : normalizeBase(parentBase, sidebar.base)
  }

  // text
  if (options.inferText && !sidebar.text && sidebar.link) {
    sidebar.text = getLastSlug(sidebar.link)
  }

  if (sidebar.items) {
    // 就近原则
    formatSidebar(sidebar.items, options, sidebar.base ? sidebar.base : parentBase)
  }

  // prepend
  if (options.root && sidebar.base && !isNestedBase(sidebar.base, options.root)) {
    sidebar.base = normalizeBase(options.root, sidebar.base)
  }
}

//
// #region type
// ---------------------------------------

type SidebarArg = Sidebar | Item | SidebarMulti

function isItemArray(sidebar: SidebarArg): sidebar is Item[] {
  return Array.isArray(sidebar)
}

/**
 * 严格的 Group 类型
 *
 * `base` 和 `items` 都存在
 */
function isGroup(sidebar: SidebarArg): sidebar is Group {
  return Object.hasOwn(sidebar, 'base') && Object.hasOwn(sidebar, 'items')
}

function isSidebarMulti(sidebar: SidebarArg): sidebar is SidebarMulti {
  return !isItemArray(sidebar) && !isGroup(sidebar)
}

function isNestedBase(base: string, root: string): boolean {
  const nroot = normalizeLink(root)
  return nroot.length > 1 && base.startsWith(nroot)
}

//
// #region normalize
// ---------------------------------------

function flink(p?: string): string {
  if (!p)
    return ''
  const link = p.startsWith('/') ? p : `/${p}`
  return link.endsWith('/') ? link.slice(0, -1) : link
}

function normalizeLink(...paths: string[]): string {
  return paths.map(flink).filter(Boolean).join('')
}

function normalizeBase(...paths: string[]): string {
  return `${normalizeLink(...paths)}/`
}

function getLastSlug(url: string): string {
  return url.replace(/\/$/, '').split('/').pop() || url
}
