import * as cheerio from 'cheerio'
import type { Dict } from './types'

export type Theme<T = any> = T extends keyof Themes
  ? { name: T } & Themes[T]
  : { name: string } & Dict

interface Themes {
  zyjared: {
    description: string
    avatar: string
    link: string
  }
}

const themes: Dict<(theme: Theme, body: string) => string> = {
  zyjared(theme: Theme<'zyjared'>, body) {
    const snip = `<p>
<small>${theme.description}</small>
<a href="${theme.link}" title="github link"><img src="${theme.avatar}" alt="avatar"></a>
</p>`

    const $ = cheerio.load(body)

    $('h1').first().after(snip)
    return $.html()
  },
}

export function renderHtmlBodyByTheme(theme: Theme, body: string) {
  if (!theme.name || !themes[theme.name]) {
    return body
  }

  return themes[theme.name](theme, body)
}
