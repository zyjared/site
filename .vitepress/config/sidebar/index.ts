import { defineSidebar } from './defineSidebar'
import { sidebar as devops } from './devops'
import { sidebar as examples } from './examples'
import { sidebar as external } from './external'
import { sidebar as os } from './os'
import { sidebar as programming } from './programming'

export const sidebar = defineSidebar({
  ...os,
  ...examples,
  ...programming,
  ...devops,
  ...external,
})
