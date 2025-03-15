import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { defineConfig, presetAttributify, presetIcons, presetWind3 } from 'unocss'

export default defineConfig({

  theme: {
    colors: {
      shared: {
        400: '#737373',
        DEFAULT: '#737373',
      },
      brand: {
        400: '#3b82f6',
        DEFAULT: '#3b82f6',
      },
    },
  },
  presets: [
    presetAttributify(),
    presetIcons(),
    presetWind3(),
    presetLegacyCompat({
    //   commaStyleColorFunction: true,
    }),
  ],
  shortcuts: [{
    'theme-text': 'text-black dark:text-white',
    'theme-bg': 'bg-neutral-100  dark:bg-neutral-900',
    'theme': ' theme-text theme-bg',
    'flex-center': 'flex justify-center items-center',
    'flex-col-center': 'flex-center flex-col',
    
  },
  [/^badge-(.*)$/, ([, c])=>`bg-${c}-500/10 text-${c}-500/90 hover:bg-${c}-500/20 px-3 py-2 text-sm rounded`]
],

  preflights: [
    {
      getCSS: () => {
        return `
          :root {
              background-color: #f5f5f5;
              color: #000;
            }

            .dark {
              background-color: #171717;
              color: #fff;
            }
          `
      },
    },
  ],
  safelist: [
    'i-solar:notes-minimalistic-line-duotone',
    'i-mdi:github',
    'i-ic:round-email',
    'i-ep:collection-tag',

    // tags
    'i-carbon:code',
    'i-carbon:cloud',
    'i-carbon:video',
    'i-carbon:keyboard'
  ],
})
