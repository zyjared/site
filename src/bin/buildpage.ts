#!/usr/bin/env node
import process from 'node:process'
import { performance } from 'node:perf_hooks'
import { program } from 'commander'
import { blue, bold, green, magenta, red, yellow } from 'colorette'
import { buildpage } from '..'
import { loadConfig } from '../core/config'
import { absolutePath, relativePath } from '../core/utils'
import pkg from '../../package.json'

const version = pkg.version

program
  .version(version)
  .usage('[options]')
  .option('-c, --config <config>', 'Path to the configuration file')
  .option('-o, --output <output>', 'Path to the output HTML file')
  .option('-i, --input <input>', 'Path to the input Markdown file')
  .option('-a, --assets <assets>', 'Path to the assets directory')
  .option('-d, --dist <dist>', 'Output directory for the generated files')
  .parse(process.argv)

run()

async function run() {
  const startTime = performance.now()

  try {
    const result = await genpage()

    const endTime = performance.now()
    const buildTime = ((endTime - startTime) / 1000).toFixed(2)

    const tips = {
      Dist: relativePath(absolutePath('.'), result.dist, false) || './',
      Html: relativePath(absolutePath('.'), result.output, false),
      Time: `${buildTime}s`,
    } as Record<string, string>

    tip(true, tips)
  }
  catch (error) {
    tip(false, {
      Error: error instanceof Error ? error.message : String(error),
    })
  }
}

function tip(sucess: boolean, lines: Record<string, string>) {
  const kColor = sucess ? green : red
  const vColor = sucess ? magenta : red
  const str = [
    blue(`\n${bold(blue('Buildpage'))} ${yellow(`v${version}`)} ${kColor(`${sucess ? 'Success ✔' : 'Failure ✖'}`)}`),
    ...Object.entries(lines).map(([k, v]) => `  ${kColor(k)}: ${vColor(v)}`),
  ].join('\n')

  // eslint-disable-next-line no-console
  console.log(str)
}

async function genpage() {
  const { config, assets, input, output, dist } = program.opts()
  if (config) {
    const dotIndex = config.lastIndexOf('.')
    const _config = await loadConfig({
      filepath: config.slice(0, dotIndex),
      extensions: [config.slice(dotIndex)],
    })
    return await buildpage(_config, false)
  }

  return await buildpage({
    input,
    output,
    assets: {
      dir: assets,
      outDir: dist,
      clean: true,
    },
    head: {},
  }, 'preferRoot')
}
