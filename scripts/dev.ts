/* eslint-disable no-console */
import process from 'node:process'
import path from 'node:path'
import createJiti from 'jiti'
import { program } from 'commander'
import chokidar from 'chokidar'
import browserSync from 'browser-sync'
import { blue, bold, green, red, yellow } from 'colorette'
import clearModule from 'clear-module'
import fs from 'fs-extra'
import pkg from '../package.json'
import { loadConfig, resolveConfig } from '../src/core/config'
import { Config } from '../src/core/types'
import type { BuildpageResult } from '../src'

const jiti = createJiti(__dirname, { interopDefault: true })

const logPrefix = 'buildpage'
const logPrefixLength = Math.max(logPrefix.length + 2, 10)

program
  .version(pkg.version)
  .usage('[options]')
  .option('-c, --config <config>', 'Path to the configuration file')
  .option('--open', 'Open the browser')
  .parse(process.argv)

const opts = program.opts()

main()

async function main() {
  const config = await getConfig(opts.config)
  const result = await startBuild(config) // 修改一些路径配置时，需要重新启动

  const bs = browserSync.create()
  const watches = ['src', opts.config, config.input].filter(Boolean)

  const serverDir = path.resolve(result.output, '..')
  fs.ensureDirSync(serverDir)

  bs.init({
    ui: false,
    server: {
      baseDir: serverDir,
      index: path.basename(result.output),
    },
    // files: [config.output],
    open: opts.open,
    host: 'localhost',
    port: 8080,
    online: false,

    logPrefix: 'buildpage',
    // logFileChanges: false,
  })

  const watcher = chokidar.watch(watches, {
    ignoreInitial: true,
    ignored: ['**/node_modules/**'],
  })

  watcher.on('all', async (e, p) => {
    log(e, p)
    await startBuild(config)
    bs.reload()
  })

  bs.reload()
}

async function startBuild(config: any): Promise<BuildpageResult> {
  clearModule('../src')
  const { buildpage } = jiti('../src')
  return await buildpage(config, 'preferUser')
}

async function getConfig(p?: string) {
  if (p) {
    const dotIndex = p.lastIndexOf('.')
    return await loadConfig({
      filepath: p.slice(0, dotIndex),
      extensions: [p.slice(dotIndex)],
    })
  }

  return null
}

function log(e: string, p: string) {
  const eventColors = {
    add: green,
    addDir: green,
    change: yellow,
    unlink: red,
    unlinkDir: red,
  }

  const eventText = eventColors[e](e.padStart(logPrefixLength, ' '))
  console.log(`${eventText} ${bold(blue('->'))}`, p)
}
