// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path'

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,
  builder: 'vite',
  modules: ['@pinia/nuxt'],
  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primevue/resources/primevue.css',
    '/node_modules/primeflex/primeflex.css'
  ],
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  build: {
    transpile: ['primevue']
  },
  vite: {
    build: {
      chunkSizeWarningLimit: 1000
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false
    }
  },
  alias: {
    components: resolve(__dirname, './components'),
    middleware: resolve(__dirname, './middleware'),
    pages: resolve(__dirname, './pages'),
    layouts: resolve(__dirname, './layouts'),
    composables: resolve(__dirname, './composables'),
    store: resolve(__dirname, '.store'),
    assets: resolve(__dirname, './assets'),
    define: resolve(__dirname, './define')
  }
})
