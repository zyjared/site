import path from 'node:path'
import process from 'node:process'
import { red } from 'colorette'
import fs from 'fs-extra'

const mapping = {
  vue: 'template-vue.md',
}

export function getTemplate(type: keyof typeof mapping) {
  const p = path.resolve(import.meta.dirname, `${mapping[type]}`)
  if (!fs.existsSync(p)) {
    console.log(red(`模板文件 ${p} 不存在`))
    process.exit(1)
  }
  return fs.readFileSync(p, 'utf-8')
}
