import { defineSidebar } from '../_utils'
import { javaApi, javaLearn } from './java'

export const sidebar = defineSidebar(
  {
    '/java/learn/': javaLearn,
    '/java/api/': javaApi,
  },
  {
    base: '/programming/',
  },
)
