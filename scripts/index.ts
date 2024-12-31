import type { Options as GenerateExamplesOptions } from './generate-examples'
import path from 'node:path'
import { blue, bold, yellow } from 'colorette'
import { program } from 'commander'
import { generate as generateExamples } from './generate-examples'

interface ScriptConfigs {
  examples: GenerateExamplesOptions
}

const scriptsConfig: ScriptConfigs = {
  examples: {
    dir: resolve('../pages/examples/css/code/'),
    outpath: resolve('../pages/examples/css/docs'),
    skip: false,
    log: false,
  },
}

const scriptsMap = {
  examples: generateExamples,
}
Object.keys(scriptsMap).forEach(k => scriptsMap[k] = formateScript(scriptsMap[k], { name: k }))

program
  .name('Scripts')
  .description('/scripts 下的所有脚本')

program
  .command('all')
  .description('执行全部脚本，使用默认配置')
  .option('--log [log]', '是否打印日志', false)
  .action(_ => Object.keys(scriptsMap).forEach(k => scriptsMap[k](scriptsConfig[k])))

program.command('examples')
  .description('将示例文件转换成 .md 文件')
  .option('-d, --dir <dir>', '文件夹，将该文件夹下的所有 .vue 文件转换成 .md 文件')
  .option('-i, --input <input>', '文件，若提供了 dir ，该选项不生效')
  .option('-o, --outpath <outpath>', '输出文件或文件夹')
  .option('--skip [skip]', '如果输出文件已存在，是否跳过', false)
  .option('--log [log]', '是否打印日志', false)
  .action(scriptsMap.examples)

program.parse()

function resolve(p: string) {
  return path.resolve(import.meta.dirname, p)
}

function formateScript<K extends Record<string, any>>(fn: (options: K) => void, scirptOptions: { name?: string } = {}) {
  return function (options: K) {
    const key = scirptOptions.name || fn.name
    const opts = { ...scriptsConfig[key], ...options }
    console.log(bold(blue('scripts'.toUpperCase())), key)
    console.log(yellow('options'), opts)
    fn(options)
  }
}
