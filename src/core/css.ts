import autoprefixer from 'autoprefixer'
import postcss from 'postcss'
import fs from 'fs-extra'
import cssnano from 'cssnano'
import type { Unhead } from './types'

async function autofixCss(css: string) {
  return await postcss([

    autoprefixer({
      overrideBrowserslist: ['last 2 versions', '>1%'],
      flexbox: 'no-2009',
      remove: false,
      grid: true,
    }),
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
      }],
    }),
  ])
    .process(css, { from: undefined, to: undefined })
    .then((result) => {
      result.warnings().forEach((warn) => {
        console.warn(warn.toString())
      })
      return result.css
    })
}

export async function addStyleToHead(head: Unhead, css: string) {
  const content = await autofixCss(css)
  head.push({ style: [content] })
}

export async function addStyleToHeadFromFile(head: Unhead, filepath: string) {
  if (!fs.existsSync(filepath)) {
    return
  }
  const css = fs.readFileSync(filepath, 'utf-8')
  await addStyleToHead(head, css)
}
