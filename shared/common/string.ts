export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function uncapitalize(str: string) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}

export function isCapitalized(str: string) {
  return str.at(0) === str.at(0)?.toUpperCase()
}
