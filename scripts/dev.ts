/* eslint-disable no-console */
import process from 'node:process'
import path from 'node:path'
import createJiti from 'jiti'
import { program } from 'commander'
import chokidar from 'chokidar'
import browserSync from 'browser-sync'
import { blue, bold, green, red, yellow } from 'colorette'
import clearModule from 'clear-module'
import pkg from '../package.json'
import { loadConfig, resolveConfig } from '../src/core/config'

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
  const bs = browserSync.create()
  const config = await getConfig(opts.config)

  bs.init({
    ui: false,
    server: {
      baseDir: path.resolve(config.output, '..'),
      index: path.basename(config.output),
    },
    // files: [config.output],
    open: opts.open,
    host: 'localhost',
    port: 8080,
    online: false,

    logPrefix: 'buildpage',
    // logFileChanges: false,
  })

  const watcher = chokidar.watch(['src', config.input], {
    ignoreInitial: true,
    ignored: ['**/node_modules/**'],
  })

  watcher.on('all', async (e, p) => {
    // clearModule(path.join(config.output, path.basename(p)))

    log(e, p)
    startBuild(bs, config)

    bs.reload()
  })

  startBuild(bs, config)
  bs.reload()
}

async function startBuild(bs: any, config: any) {
  clearModule('../src')
  const { buildpage } = jiti('../src')
  buildpage(config, 'preferUser')
  bs.reload()
}

async function getConfig(p?: string) {
  let config: any
  if (p) {
    const dotIndex = p.lastIndexOf('.')
    config = await loadConfig({
      filepath: p.slice(0, dotIndex),
      extensions: [p.slice(dotIndex)],
    })
  }

  return await resolveConfig(config, 'preferUser')
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
