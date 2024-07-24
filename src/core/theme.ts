import type { ThemeFrontMatter, Unhead } from './types'
import { absolutePath, importModuleFromPath } from './utils'
import { addStyleToHeadFromFile } from './css'

interface ThemeOptions {
  theme?: ThemeFrontMatter
  body: string
  head: Unhead
}

export async function applyTheme(options: ThemeOptions) {
  const { theme, body, head } = options

  const themesdir = absolutePath(__dirname, '../themes', theme?.name || 'normal')

  const stylepath = absolutePath(themesdir, `style.css`)
  await addStyleToHeadFromFile(head, stylepath)

  const themeFn = await importModuleFromPath({
    dirname: __dirname,
    filepath: absolutePath(themesdir, 'index'),
    extensions: ['.js', '.cjs', '.ts'],
  })

  return themeFn ? themeFn({ theme, body, head }) : body
}

export function defineTheme<T extends ThemeFrontMatter = ThemeFrontMatter>(fn: (options: { theme: T, body: string, head: Unhead }) => string) {
  return fn
}
