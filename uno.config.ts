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
import { dxShortcut } from './shared/node/uno/shortcuts'

export default defineConfig({
  theme: {
    colors: {
      shared: {
        400: '#737373',
        DEFAULT: '#737373',
      },
      brand: {
        400: '',
        DEFAULT: '',
      },
    },
  },

  shortcuts: [
    {
      'flex-center': 'flex justify-center items-center',
      'flex-col-center': 'flex-center flex-col',
    },
    dxShortcut({ name: 'ctx-text', base: 'text', value: 'black dark:white' }),
    dxShortcut({ name: 'ctx-bg', base: 'bg', value: 'neutral-100 dark:neutral-900' }),
    dxShortcut({ name: 'ctx-a', base: 'text', value: 'blue-500 hover:blue-600 dark:blue dark:hover:blue-500' }),
    dxShortcut({ name: 'ctx-link', base: 'text', value: 'shared hover:ctx-text/80', extra: 'transition-colors' }),

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
    'i-carbon:logo-github',
    'i-carbon:email',
    'i-carbon:home',

    // links
    'i-mdi:feather',
    'i-carbon:bookmark',
    'i-carbon:notebook',
    // 'i-memory:pound', // # 号

    // tags (badges)
    'i-carbon:code',
    'i-carbon:cloud',
    'i-carbon:video',
    'i-carbon:keyboard',
  ],
})
