export function genValueFromString(value: string) {
  if (value === 'true')
    return true
  if (value === 'false')
    return false
  if (value === 'null')
    return null
  if (value === 'undefined')
    return undefined
  if (!Number.isNaN(+value))
    return +value

  return value
}

/** no use */
export function addItemBeforeEachLine(text: string, item: string) {
  return !text ? text : text.replace(/^([\t\v\f \xA0\u1680\u2000-\u200A\u202F\u205F\u3000\uFEFF]*\S.*)$/gm, `${item}$1`)
}

export function isEqual(c1: any, c2: any, comparisonKeys?: string[]) {
  if (c1 === c2) {
    return true
  }

  if (typeof c1 !== typeof c2) {
    return false
  }

  // Array
  if (Array.isArray(c1) && Array.isArray(c2)) {
    if (c1.length !== c2.length) {
      return false
    }

    const cSet = new Set(c1)

    for (let i = 0; i < c2.length; i++) {
      if (cSet.has(c2[i])) {
        continue
      }

      let has = false
      for (let j = i + 1; j < c2.length; j++) {
        if (isEqual(c1[j], c2[1])) {
          has = true
          break
        }
      }

      if (!has)
        return false
    }

    return true
  }

  // Object
  if (typeof c1 === 'object' && typeof c2 === 'object') {
    const keys = comparisonKeys || Object.keys(c1)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]

      if (!isEqual(c1[key], c2[key])) {
        return false
      }
    }

    return true
  }

  return false
}
