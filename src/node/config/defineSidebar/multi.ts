import type { FormatOptions } from './format'
import type { Group, Item, SidebarMulti } from './types'
import { formatSidebarMulti } from './format'
import { normalizeBase } from './link'
import { isGroup } from './types'

export function createSidebarMulti<T extends Item[] | Group[]>(sidebar: T, options: FormatOptions): SidebarMulti {
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
