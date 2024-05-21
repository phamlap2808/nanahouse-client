import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categorySelected: {
      _id: 0,
      name: ''
    }
  }),
  getters: {
    getCategorySelected: (state) => state.categorySelected
  },
  actions: {
    setCategorySelected(payload: { category_id: number; category_name: string }) {
      this.categorySelected = payload
    }
  }
})
