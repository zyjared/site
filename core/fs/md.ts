import fs from 'fs-extra'
import opts from '../options'
import { parseMd } from '../serializer/md'

const options = {
  input: opts.input,
}

function r() {
  return fs.readFileSync(options.input, 'utf-8')
}

export function readMd() {
  return parseMd(r())
}
