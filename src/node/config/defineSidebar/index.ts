import type { FormatOptions } from './format'
import type { Sidebar, SidebarMulti } from './types'
import { formatSidebarMulti } from './format'
import { createSidebarMulti } from './multi'
import { isSidebarMulti } from './types'

interface Options extends FormatOptions {}

const defaultOptions: Options = {
  nest: true,
  inferText: true,
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
 * @param options.inferText - text 默认推断
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

  const opts = { ...defaultOptions, ...options }

  if (isSidebarMulti(sidebar)) {
    formatSidebarMulti(sidebar, opts)
    return sidebar
  }

  return createSidebarMulti(Array.isArray(sidebar) ? sidebar : [sidebar], opts)
}
