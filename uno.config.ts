import { defineConfig, presetAttributify, presetIcons, presetWind4 } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      shared: {
        400: '#737373',

      },
      brand: {
        400: '#3b82f6',
      },
    },
  },
  shortcuts: {
    theme: 'bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white',
  },
  presets: [
    presetAttributify(),
    presetIcons(),
    presetWind4(),
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
  ],
})
