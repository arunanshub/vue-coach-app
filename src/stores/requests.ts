import { db } from '@/firebase'
import { get, push, query, ref, set } from 'firebase/database'
import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

interface CoachingRequest {
  coachId: string
  userEmail: string
  message: string
}

interface CoachingRequestWithID extends CoachingRequest {
  id: string
}

interface State {
  requests: CoachingRequestWithID[]
  isLoading: boolean
}

export const useRequestsStore = defineStore('requests', {
  state: (): State => ({
    requests: [],
    isLoading: false,
  }),

  actions: {
    async submitRequest(request: CoachingRequest) {
      const newRequestRef = push(ref(db, 'requests'))
      await set(newRequestRef, { ...request })
      this.requests.push({ id: newRequestRef.key as string, ...request })
    },
    async loadRequests() {
      this.isLoading = true
      const coachesRes = await get(query(ref(db, 'requests')))
      const requests = [] as CoachingRequestWithID[]
      coachesRes.forEach((child) => {
        requests.push({ id: child.key as string, ...child.val() })
      })
      this.requests = requests
      this.isLoading = false
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
    },
  },
})
