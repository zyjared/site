import { generate } from '../generate'
import {program} from 'commander'

program
    .version('0.0.1')
    .option('-i, --input <input>', 'input file')
    .option('-o, --output <output>', 'output file')
    .option('-p, --public <public>', 'public dir')
    .option('-d, --dist <dist>', 'dist dir')

program.parse(process.argv)

const options = program.opts()

generate(options)

console.log('build success')