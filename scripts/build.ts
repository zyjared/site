import process from 'node:process'
import { program } from 'commander'
import { generate } from '../generate'

program
  .version('0.0.1')
  .option('-i, --input <input>', 'input file')
  .option('-o, --output <output>', 'output file')
  .option('-p, --public <public>', 'public dir')
  .option('-d, --dist <dist>', 'dist dir')

program.parse(process.argv)

const options = program.opts()

generate(options)

// eslint-disable-next-line no-console
console.log('build success')
