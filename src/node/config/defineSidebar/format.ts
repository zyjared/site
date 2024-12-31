import type { Item, SidebarMulti } from './types'
import { getLastSlug, normalizeBase } from './link'
import { isItemArray, isNestedBase } from './types'

export interface FormatOptions {
  /**
   * 根目录
   */
  root?: string

  /**
   * base 是否需要嵌套处理
   *
   * @default true
   */
  nest?: boolean

  /**
   * 是否推断 text
   *
   * @default true
   */
  inferText?: boolean

  onFormated?: (item: Item, parent?: Item | null) => void
}

export function formatSidebar<T extends Item | Item[]>(
  sidebar: T,
  options: FormatOptions,
  parent?: Item | null,
) {
  if (isItemArray(sidebar)) {
    sidebar.forEach(item => formatSidebar(item, options, parent))
    return
  }

  const { root, nest, inferText, onFormated } = options

  formatBase(sidebar, parent, nest)
  formatText(sidebar, inferText)

  if (sidebar.items) {
    // 就近原则
    formatSidebar(sidebar.items, options, sidebar.base ? sidebar : parent)
  }

  formatPrepend(sidebar, root)
  onFormated?.(sidebar, parent)
}

function formatBase(sidebar: Item, parent?: Item | null, nest?: boolean) {
  if (!sidebar.base)
    return

  sidebar.base = !nest || isNestedBase(sidebar.base, parent?.base)
    ? normalizeBase(sidebar.base)
    : normalizeBase(parent?.base, sidebar.base)
}

function formatText(sidebar: Item, infer = false) {
  if (infer && !sidebar.text && sidebar.link) {
    sidebar.text = getLastSlug(sidebar.link)
  }
}

function formatPrepend(sidebar: Item, root?: string) {
  if (root && sidebar.base && !isNestedBase(sidebar.base, root)) {
    sidebar.base = normalizeBase(root, sidebar.base)
  }
}

export function formatSidebarMulti(sidebar: SidebarMulti, options: FormatOptions) {
  const { root } = options
  const keys = Object.keys(sidebar)

  keys.forEach((key) => {
    const items = sidebar[key]

    if (Object.hasOwn(sidebar, key)) {
      delete sidebar[key]
    }

    formatSidebar(items, options)

    const p = isNestedBase(key, root) ? normalizeBase(key) : normalizeBase(root, key)
    sidebar[p] = items
  })
}
