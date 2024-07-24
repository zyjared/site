import type { Head } from '@unhead/schema'

export type { Head, SchemaAugmentations, Unhead } from '@unhead/schema'

export type Dict<T = any> = Record<string, T>

export type ThemeFrontMatter<T extends Dict = Dict> = { name: string } & T

export type FrontMatter = Head & {
  theme?: ThemeFrontMatter
}

export interface FileImportOptions {
  dirname?: string
  filepath: string
  extensions: string[]
}
