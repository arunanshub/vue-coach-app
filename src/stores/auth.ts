import { auth } from '@/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { defineStore } from 'pinia'

interface State {
  /** id of the user who is using the app.
   */
  userId?: string
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    userId: undefined,
  }),

  actions: {
    async signup(username: string, password: string) {
      const cred = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      )
      this.userId = cred.user.uid
    },
    async login(username: string, password: string) {
      const cred = await signInWithEmailAndPassword(auth, username, password)
      this.userId = cred.user.uid
    },
    async logout() {
      await signOut(auth)
      this.$reset()
    },
  },

  getters: {
    isLoggedIn(state) {
      return !!state.userId
    },
  },
  persist: true,
})
