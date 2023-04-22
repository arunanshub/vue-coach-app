import { defineStore } from 'pinia'

export interface UsersInfo {
  name: string
  age: number
}

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [] as UsersInfo[],
  }),
  actions: {
    addUser(info: UsersInfo) {
      this.users.unshift(info)
    },
  },
  getters: {
    allUsers(state) {
      return state.users
    },
    latestUser(state): UsersInfo | undefined {
      return state.users[0]
    },
  },
})
