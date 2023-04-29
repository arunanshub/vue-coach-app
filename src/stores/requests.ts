import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

import { useAuthStore } from './auth'

interface RequestData {
  coachId: string
  userEmail: string
  message: string
}

interface CoachRequest extends RequestData {
  id: string
}

interface State {
  requests: CoachRequest[]
}

export const useRequestsStore = defineStore('requests', {
  state: (): State => ({
    requests: [],
  }),

  actions: {
    submitRequest(request: RequestData) {
      this.requests.push({ id: uuidv4(), ...request })
    },
  },

  getters: {
    hasRequests(state) {
      return state.requests.length > 0
    },
    requestsForCurrentCoach(state) {
      const authStore = useAuthStore()
      return state.requests.filter((req) => req.coachId === authStore.userId)
    },
    hasRequestsForCurrentCoach() {
      return this.requestsForCurrentCoach.length > 0
    }
  },
})
