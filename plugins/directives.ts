import loading from './directives/loading'
import loading2 from './directives/loading2'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('loading', loading)
  nuxtApp.vueApp.directive('loading-2', loading2)
})
