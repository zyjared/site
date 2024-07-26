import type { Head, SchemaAugmentations, Unhead } from '@unhead/schema'

export type { Head, SchemaAugmentations, Unhead } from '@unhead/schema'

export type HeadCreated = Unhead<Head<SchemaAugmentations>>

export type Dict<T = any> = Record<string, T>

export type ThemeFrontMatter<T extends Dict = Dict> = { name: string } & T

export type FrontMatter = Head & {
  theme?: ThemeFrontMatter
}

export interface DefaultConfig {
  input: string
  output: string
  assets: {
    dir: string
    ignore: string[]
    include: string[]

    outDir: string

    /** 是否清空 outDir */
    clean: boolean

    /** dev：是否覆盖 */
    overwrite?: boolean
  }
  head: Head
}

export type Config = {
  [k in keyof DefaultConfig]?: DefaultConfig[k] extends Dict ? Partial<DefaultConfig[k]> : DefaultConfig[k]
}
