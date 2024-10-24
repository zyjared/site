function resolveSidebarBase(...paths: string[]) {
  return encodeURI(`/${paths.map(p => p.split('/')).flat().filter(Boolean).join('/')}/`)
}

interface SidebarBaseBuilderReturn {
  /** sibar 的 base 项 */
  base: string

  /** 可用该函数构建子 sidebar 的 base */
  resolveBase: (...child: string[]) => string

  /** 子 sidebar 的 SidebarBaseBuilderReturn */
  sidebarBaseBuilder: (...child: string[]) => SidebarBaseBuilderReturn
}

/**
 * 如果需要子 sidebar 的 base，可以使用该函数，
 * 只是方便省略相同的部分前缀。
 */
export function sidebarBaseBuilder(...paths: string[]): SidebarBaseBuilderReturn {
  const base = resolveSidebarBase(...paths)
  return {
    base,
    resolveBase: (...subpaths: string[]) => base + resolveSidebarBase(...subpaths).slice(1),
    sidebarBaseBuilder: (...subpaths: string[]) => sidebarBaseBuilder(base, ...subpaths),
  }
}
