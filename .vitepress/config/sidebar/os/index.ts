import { defineSidebar } from '../_utils'
import { linux } from './linux'

export const sidebar = defineSidebar(
  {
    '/linux/': linux,
  },
  {
    base: '/os/',
  },
)
