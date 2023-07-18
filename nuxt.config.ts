// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL || ''
    }
  },
  builder: 'vite',
  modules: ['@pinia/nuxt', 'dayjs-nuxt'],
  css: ['vuetify/lib/styles/main.sass', 'assets/style/main.scss'],
  build: {
    transpile: ['vuetify']
  },
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      'process.env.DEBUG': false
    }
  },
  dayjs: {
    locales: ['vi'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'vi',
    defaultTimezone: 'Asia/Ho_Chi_Minh'
  },
  alias: {
    components: resolve(__dirname, './components'),
    middleware: resolve(__dirname, './middleware'),
    pages: resolve(__dirname, './pages'),
    layouts: resolve(__dirname, './layouts'),
    composables: resolve(__dirname, './composables'),
    store: resolve(__dirname, '.store'),
    assets: resolve(__dirname, './assets'),
    define: resolve(__dirname, './define'),
    constant: resolve(__dirname, './constant'),
    services: resolve(__dirname, './services')
  }
})
