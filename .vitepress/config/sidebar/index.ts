import { defineSidebar } from './defineSidebar'
import { sidebar as examples } from './examples'
import { sidebar as external } from './external'
import { sidebar as os } from './os'
import { sidebar as programming } from './programming'

// 不要启用 options，在对应的 sidebar 已处理过

export const sidebar = defineSidebar(
  {
    ...os,
    ...examples,
    ...programming,
    ...external,
  },
)
