import path from 'node:path'
import { matchAllTags } from './match'

export interface TransformOptions {
  source: string
  file: string
  code: string

  utils: {
    relativePath: typeof relativePath
    getCodeGroup: typeof getCodeGroup
  }
}

export function transformCodeToMd(options: Omit<TransformOptions, 'utils'>, transform?: (ctx: TransformOptions) => string) {
  const { source, file, code } = options
  const templatePath = relativePath(source, file)
  const codeGroup = getCodeGroup(code)

  if (transform) {
    return transform({ ...options, utils: { relativePath, getCodeGroup } })
  }

  return `<script setup>
import Code from '${templatePath}'
</script>

# ${path.basename(file, path.extname(file))}

## 效果

<Code />

## 源码

::: code-group
${codeGroup}
:::
`
}

function relativePath(source: string, file: string) {
  const p = path.relative(path.dirname(file), source)
    .split(path.sep)
    .join('/')

  return p.startsWith('.') ? p : `./${p}`
}

/**
 * `grupMap`:
 * - `{ style: 'css' }` css 代码
 * - `{ style: 'css 样式' }` css 代码，文件名为 '样式'
 */
function getCodeGroup(content: string, groupMap: Partial<Record<'style' | 'template' | 'script', string>> = {}) {
  const maps = {
    style: 'css',
    template: 'html',
    script: 'typescript',
    ...groupMap,
  }
  const codes = Object.entries(maps).reduce((acc, [k, _v]) => (
    {
      ...acc,
      [k]: matchAllTags(content, k).map(code => code.code).join('\n'),
    }
  ), {})

  return Object.entries(maps)
    .map(([k, v]) => codes[k] ? `\`\`\`${v}\n${codes[k]}\n\`\`\`` : '')
    .filter(Boolean)
    .join('\n\n')
}
