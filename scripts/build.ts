import { generate } from '../generate'
import {program} from 'commander'

const defaultOptions = {
    input: 'README.md',
    output: 'dist/index.html',
    public: 'public',
    dist: 'dist',
}

program
    .version('0.0.1')
    .option('-i, --input <input>', 'input file')
    .option('-o, --output <output>', 'output file')
    .option('-p, --public <public>', 'public dir')
    .option('-d, --dist <dist>', 'dist dir')

program.parse(process.argv)

const options = program.opts()

generate({
    ...defaultOptions,
    ...options
})

console.log('build success')