import { RouteLocationNormalized } from 'vue-router'
export default defineNuxtRouteMiddleware((to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  if (to.path.includes('admin')) {
    const token = $cookie('token')
    const groupId = $cookie('group_id')
    if (!token.value) {
      token.value = null
      groupId.value = null
      navigateTo({ name: 'auth-login' })
    }
    if (!groupId.value || groupId.value === '1') {
      token.value = null
      groupId.value = null
      navigateTo({ name: 'auth-login' })
    }
  }
})