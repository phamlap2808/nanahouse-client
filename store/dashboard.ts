import { defineStore } from 'pinia'


interface IDashboard {
  adminCart: {
    product_id: number
    price: number
    amount: number
    image: string
    slug: string
    title: string
  }[]
}

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    adminCart: []
  }),
  getters: {
    getAdminCart: (state) => state.adminCart
  },
  actions: {
    setAdminCart(payload: IDashboard['adminCart']) {
      this.adminCart = payload
    }
  }
})