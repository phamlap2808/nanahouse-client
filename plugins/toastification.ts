/**
 * Plugin Notification
 * Doc: https://github.com/Maronato/vue-toastification#usage
 */
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
export default defineNuxtPlugin((nuxtApp) => {
  const options = {
    // You can set your default options here
    timeout: 5000
    // rtl: true,
  }

  nuxtApp.vueApp.use(Toast, options)
})
