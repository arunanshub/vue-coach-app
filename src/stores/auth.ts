import { useCounterStore } from './counter'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    login() {
      this.isLoggedIn = true
    },
    logout() {
      const counter = useCounterStore()
      this.isLoggedIn = false
      counter.$reset()
    },
  },
})
