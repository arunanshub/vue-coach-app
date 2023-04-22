import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  actions: {
    increment(by: number = 1) {
      this.counter += by
    },
    async incrementWithDelay(by: number = 1, delay: number = 2000) {
      setTimeout(this.increment, delay, by)
    },
    setValue(value: number) {
      this.counter = value
    },
  },
  getters: {
    currentCount(state) {
      return state.counter
    },
    doubleCount(state) {
      return state.counter * 2
    },
  },
})
