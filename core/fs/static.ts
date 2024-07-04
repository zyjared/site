import fs from 'fs-extra'
import opts from '../options'

const options = {
  public: opts.public,
  outputDir: opts.output.dir,
  clean: opts.output.clean,
}

export function copyStatic() {
  if (options.clean) {
    fs.removeSync(options.outputDir)
  }
  fs.ensureDirSync(options.outputDir)
  fs.copySync(options.public, options.outputDir)

  return options
}
