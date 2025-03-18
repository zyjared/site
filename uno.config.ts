import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  // 4 和 3 行为不太一样，谨慎修改
  // presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      shared: {
        400: '#737373',
        DEFAULT: '#737373',
      },
    },
  },
  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex-center flex-col',
    },

    // 上下文
    [/^ctx-text(.*)$/, ([, o]) => `text-black${o} dark:text-white${o}`],
    [/^ctx-bg(.*)$/, ([, o]) => `bg-neutral-100${o} dark:bg-neutral-900${o}`],
    [/^(.*)-ctx-text(.*)$/, ([, w, o]) => `${w}-black${o} dark:${w}-white${o}`],
    [/^(.*)-ctx-bg(.*)$/, ([, w, o]) => `${w}-neutral-100${o} dark:${w}-neutral-900${o}`],

    // [/^ctx-a(.*)$/, ([, c]) => `text-indigo-500${c} hover:text-sky-400${c}`],
    [/^ctx-link(.*)$/, ([, c]) => `text-shared${c} hover:ctx-text/70 transition-colors`],

    [/^badge-(.*)$/, ([, c]) => `bg-${c}-500/10 text-${c}-500/90 hover:bg-${c}-500/20 px-3 py-2 text-sm rounded`],
  ],
  rules: [
  ],

  presets: [
    presetWind3(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],

  preflights: [
    {
      getCSS: _ctx => `
        :root {
          background-color: #f5f5f5;
          color: #000;
        }

        .dark {
          background-color: #171717;
          color: #fff;
        }
      `,
    },
  ],

  safelist: [
    'bg-white',

    'i-carbon:logo-github',
    'i-carbon:email',
    'i-carbon:home',

    // links
    'i-carbon:bookmark',
    'i-carbon:notebook',
    'i-memory:pound',

    // tags (badges)
    'i-carbon:code',
    'i-carbon:cloud',
    'i-carbon:video',
    'i-carbon:keyboard',
  ],
})
