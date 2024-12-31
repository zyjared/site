import { defineSidebar } from './_utils'
import { sidebar as algorithm } from './algorithm'
import { sidebar as dataStructure } from './data-structure'
import { sidebar as examples } from './examples'
import { sidebar as os } from './os'
import { sidebar as programming } from './programming'

export { defineSidebar } from './_utils'

// 不要启用 options，在对应的 sidebar 已处理过

export const sidebar = defineSidebar({
  ...os,
  ...examples,
  ...dataStructure,
  ...algorithm,
  ...programming,
})
