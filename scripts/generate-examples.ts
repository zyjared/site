import path from 'node:path'
import { blue, green, red } from 'colorette'
import fs from 'fs-extra'
import { formateOptions, isDir } from './_utils'
import { generateContent as generateContentVue } from './examples/example-vue'

export interface Options {
  /**
   * 文件夹，将该文件夹下的所有 .vue 文件转换成 .md 文件
   */
  dir?: string
  /**
   * 输出文件夹
   */
  input?: string
  /**
   * 输出文件或文件夹
   */
  outpath?: string
  /**
   * 如果输出文件已存在，是否跳过
   */
  skip?: boolean
  /**
   * 是否打印日志
   */
  log?: boolean
}

export function generate(options: Options) {
  options = initOptions(options)
  const { dir, input, outpath } = options

  if (dir)
    _generateByDir(dir, options)
  else if (input)
    _generate(input, outpath, options)
  else
    console.log(red('请提供文件或文件夹'))
}

function _generateByDir(dir: string, options: Pick<Options, 'log' | 'skip' | 'outpath'> = {}) {
  fs.readdirSync(dir).forEach((file) => {
    const fp = path.join(dir, file)

    if (isDir(fp))
      _generateByDir(fp, options)
    else if (fileCanGenerate(fp))
      _generate(fp, options.outpath, options)
  })
}

function _generate(filepath: string, savepath?: string, options: Pick<Options, 'log' | 'skip'> = {}) {
  const { skip, log } = options

  savepath = transformSavepath(filepath, savepath)

  const isExists = fs.existsSync(savepath)
  if (!isExists || (isExists && !skip)) {
    const content = generateContentVue(filepath, savepath)

    fs.writeFileSync(savepath, content)

    log && console.log(filepath, '\n', blue('  -> '), green(savepath))
  }
}

function initOptions(options: Options) {
  const absPathkeys = ['dir', 'input', 'outpath']
  formateOptions(options, { absPathkeys })
  return options
}

function transformFilename(filepath: string) {
  return `${path.basename(filepath, '.vue')}.md`
}

function transformSavepath(filepath: string, savepath?: string) {
  if (!savepath)
    return path.join(path.dirname(filepath), transformFilename(filepath))

  return isDir(savepath)
    ? path.join(savepath, transformFilename(filepath))
    : savepath
}

function fileCanGenerate(filepath: string) {
  return filepath.endsWith('.vue')
}
