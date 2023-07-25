import { defineNuxtPlugin } from '#app'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component(
    'QuillEditor',
    defineAsyncComponent(() => import('@vueup/vue-quill').then(({ QuillEditor }) => QuillEditor))
  )
})
