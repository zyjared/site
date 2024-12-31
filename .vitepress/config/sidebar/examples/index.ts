import { defineSidebar } from '../_utils'
import { css } from './css'

export const sidebar = defineSidebar(
  {
    '/css/': css,
  },
  {
    base: '/examples/',
  },
)
