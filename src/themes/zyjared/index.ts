import * as cheerio from 'cheerio'
import { defineTheme } from '../../core/theme'

export default defineTheme((options) => {
  const { theme, body, head } = options
  const { description, avatar, link } = theme

  const desc = `<small>${description || 'welcome'}</small>`
  const img = avatar ? `<a href="${link || '#'}" title="github link"><img src="${avatar}" alt="avatar"></a>` : '<br />'

  const $ = cheerio.load(body)

  $('h1').first().after(`<p>${desc}${img}</p>`)

  head.push({
    link: [
      { rel: 'stylesheet', href: 'https://use.typekit.net/rzl1qcy.css' },
    ],
  })

  return $('body').html() || ''
})
