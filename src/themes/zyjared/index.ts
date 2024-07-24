import * as cheerio from 'cheerio'
import { defineTheme } from '../../core/theme'

export default defineTheme((options) => {
  const { theme, body, head } = options
  const { description, avatar, link } = theme
  const p = `
<p>
<small>${description || 'welcome'}</small>
<a href="${link || '#'}" title="github link"><img src="${avatar || 'favicon.ico'}" alt="avatar"></a>
</p>`

  const $ = cheerio.load(body)

  $('h1').first().after(p)

  head.push({
    link: [
      { rel: 'stylesheet', href: 'https://use.typekit.net/rzl1qcy.css' },
    ],
  })

  return $('body').html() || ''
})
