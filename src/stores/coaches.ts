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
  isUserCoach: boolean
}

export const useCoachStore = defineStore('coaches', {
  state: (): State => ({
    isUserCoach: false,
    coaches: [
      {
        id: 'c1',
        firstName: 'Maximilian',
        lastName: 'Schwarzmüller',
        areas: ['frontend', 'backend', 'career'],
        description:
          "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        hourlyRate: 30,
      },
      {
        id: 'c2',
        firstName: 'Julie',
        lastName: 'Jones',
        areas: ['frontend', 'career'],
        description:
          'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
        hourlyRate: 30,
      },
    ],
  }),

  actions: {
    setCoaches(coaches: Coach[]) {
      this.coaches = coaches
    },
    getCoach(id: string) {
      return this.coaches.find((coach) => coach.id === id)
    },
    register(coach: Coach) {
      this.coaches.push(coach)
      this.isUserCoach = true
    },
  },

  getters: {
    hasCoaches(state) {
      return !!state.coaches.length
    },
  },
})
