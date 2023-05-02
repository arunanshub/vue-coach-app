import { db } from '@/firebase'
import { get, query, ref, set } from 'firebase/database'
import { defineStore } from 'pinia'

export interface Coach {
  id: string
  firstName: string
  lastName: string
  description?: string
  areas: string[]
  hourlyRate: number
}

interface State {
  coaches: Coach[]
  isLoading: boolean
  lastFetch?: number
}

export const useCoachStore = defineStore('coaches', {
  state: (): State => ({
    coaches: [],
    isLoading: false,
    lastFetch: undefined,
  }),

  actions: {
    setFetchTimestamp() {
      this.lastFetch = Date.now()
    },
    async loadCoaches(forceRefresh = false) {
      if (!this.shouldUpdate && !forceRefresh) {
        return
      }
      this.setFetchTimestamp()
      this.isLoading = true
      const coachesRes = await get(query(ref(db, 'coaches')))
      const coaches = [] as Coach[]
      coachesRes.forEach((child) => {
        coaches.push({ id: child.key as string, ...child.val() })
      })
      this.coaches = coaches
      this.isLoading = false
    },
    getCoach(id: string) {
      return this.coaches.find((coach) => coach.id === id)
    },
    isUserCoach(userId: string) {
      return !!this.getCoach(userId)
    },
    async register(coach: Coach) {
      if (this.isUserCoach(coach.id)) {
        throw new Error('User is already a coach')
      }

      const newCoachRef = ref(db, `coaches/${coach.id}`)
      await set(newCoachRef, {
        firstName: coach.firstName,
        lastName: coach.lastName,
        description: coach.description,
        areas: coach.areas,
        hourlyRate: coach.hourlyRate,
      })
      this.coaches.push(coach)
    },
  },

  getters: {
    hasCoaches(state) {
      return !state.isLoading && state.coaches.length > 0
    },
    shouldUpdate(): boolean {
      if (!this.lastFetch) {
        return true
      }
      return (Date.now() - this.lastFetch) / 1000 > 60
    },
  },
  persist: {
    storage: sessionStorage,
  },
})
