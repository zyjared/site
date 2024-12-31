import path from 'node:path'
import { matchAllTags } from './match'

export function transformCodeToMd(code: string, source: string, file: string) {
  const templatePath = relativePath(source, file)
  const codeGroup = getCodeGroup(code)
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
function getCodeGroup(content: string, groupMap: Record<string, string> = {
  style: 'css',
  template: 'html',
  script: 'typescript',
}) {
  const codes = Object.entries(groupMap).reduce((acc, tag) => (
    {
      ...acc,
      [tag[0]]: matchAllTags(content, tag[0]).map(code => code.code).join('\n'),
    }
  ), {})

  return Object.entries(groupMap)
    .map(tag => codes[tag[0]] ? `\`\`\`${tag[1]}\n${codes[tag[0]]}\n\`\`\`` : '')
    .filter(Boolean)
    .join('\n\n')
}
