import Path from 'node:path'
import process from 'node:process'

export function peerPath(...p: string[]) {
  return Path.isAbsolute(p[0])
    ? Path.resolve(...p)
    : Path.resolve(Path.dirname(__filename), ...p)
}

export function path(...p: string[]) {
  return Path.isAbsolute(p[0])
    ? Path.resolve(...p)
    : Path.resolve(process.cwd(), ...p)
}
