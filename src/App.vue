<script setup lang="ts">
import { provide, reactive, ref } from 'vue'

import TheNavigation from './components/nav/TheNavigation.vue'
import TeamsList from './components/teams/TeamsList.vue'
import UsersList from './components/users/UsersList.vue'

export interface Team {
  id: string
  name: string
  members: string[]
}

export interface User {
  id: string
  fullName: string
  role: string
}

const teams = reactive<Team[]>([
  { id: 't1', name: 'Frontend Engineers', members: ['u1', 'u2'] },
  { id: 't2', name: 'Backend Engineers', members: ['u1', 'u2', 'u3'] },
  { id: 't3', name: 'Client Consulting', members: ['u4', 'u5'] },
])
const users = reactive<User[]>([
  { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer' },
  { id: 'u2', fullName: 'Praveen Kumar', role: 'Engineer' },
  { id: 'u3', fullName: 'Julie Jones', role: 'Engineer' },
  { id: 'u4', fullName: 'Alex Blackfield', role: 'Consultant' },
  { id: 'u5', fullName: 'Marie Smith', role: 'Consultant' },
])
provide('teams', teams)
provide('users', users)

// page switcher
const activePage = ref('TeamsList')
function setActivePage(page: string) {
  activePage.value = page
}
</script>

<script lang="ts">
// Register the names of components that will be used dynamically.
// NOTE: It is not possible to use the composition API to manage components
// dynamically without using additional hacks.
export default {
  components: {
    TeamsList,
    UsersList,
  },
}
</script>

<template>
  <TheNavigation @set-page="setActivePage"></TheNavigation>
  <main>
    <component :is="activePage"></component>
  </main>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
