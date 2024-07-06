import process from 'node:process'
import { program } from 'commander'
import { generate, merge, path } from '../index'

program
  .version('0.0.1')
  .usage('[options]')
  .option('-i, --input <input>', 'input file')
  .option('-o, --output <output>', 'output file')
  .option('-p, --public <public>', 'public dir')
  .option('-d, --dist <dist>', 'dist dir')
  .option('-c, --config <config>', 'config file')

function run() {
  program.parse(process.argv)

  const { config, ...options } = program.opts()

  if (config && !/^(?:\.\/)?config\.ts$/.test(config)) {
    import(path(config)).then((m) => {
      generate(merge(m.default, options))
    })
  }
  else {
    generate(options)
  }

  // eslint-disable-next-line no-console
  console.log('build success')
}

run()
