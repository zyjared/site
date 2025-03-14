// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'zyjared',
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  modules: ['@unocss/nuxt', '@nuxtjs/color-mode', '@formkit/auto-animate/nuxt'],
  colorMode: {
    // const colorMode = useColorMode()
    preference: 'system', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode',
  },
  vite: {
  },
})
