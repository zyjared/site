import type { Toc } from './transform'
import { transform } from './transform'

export type { Toc } from './transform'

export interface GenerateTocOptions {
  tocs: Toc[]
  title: string
}

export function generateToc(options: GenerateTocOptions) {
  return transform(options)
}
