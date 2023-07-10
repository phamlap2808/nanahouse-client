import { defineStore } from 'pinia'

export const useSystemStore = defineStore('system', {
  state: () => ({
    loadingScreen: false
  }),
  getters: {
    getLoadingScreen: (state) => state.loadingScreen
  },
  actions: {
    setLoadingScreen(payload: boolean) {
      this.loadingScreen = payload
    }
  }
})
