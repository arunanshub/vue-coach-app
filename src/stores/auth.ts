import { defineStore } from 'pinia'

interface State {
  /** id of the user who is using the app.
   */
  userId: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    userId: 'c3',
  }),

  actions: {
    login(userId: string) {
      this.userId = userId
    },
    logout() {
      this.$reset()
    },
  },

  getters: {
    isLoggedIn(state) {
      return !!state.userId
    },
  },
})
