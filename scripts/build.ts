import process from 'node:process'
import { program } from 'commander'
import fs from 'fs-extra'
import { absolutePath } from '../src/core/utils'
import pkg from '../package.json'

program
  .version(pkg.version)
  .usage('[options]')
  .option('-r, --rootDir <rootDir>', 'Path to the source directory')
  .option('-o, --outDir <outDir>', 'Path to the build directory')

program.parse(process.argv)

const { rootDir = 'src', outDir = 'build' } = program.opts()

const themesDir = absolutePath(rootDir, 'themes')
const themesBuildDir = absolutePath(outDir, 'themes')

copyThemeStyles(themesDir, themesBuildDir)

function copyThemeStyles(dirpath: string, buildDir: string) {
  const files = fs.readdirSync(dirpath)

  for (const file of files) {
    const abspath = absolutePath(dirpath, file)

    if (fs.statSync(abspath).isDirectory()) {
      copyThemeStyles(abspath, absolutePath(buildDir, file))
    }
    else if (file.endsWith('.css')) {
      fs.ensureDirSync(absolutePath(buildDir))
      fs.copyFileSync(abspath, absolutePath(buildDir, file))
    }
    else {
      //
    }
  }
}
