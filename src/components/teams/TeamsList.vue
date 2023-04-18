<script setup lang="ts">
import TeamsItem from './TeamsItem.vue'
import type { Team } from '@/App.vue'
import { inject } from 'vue'

const teams = inject<Team[]>('teams', [])
</script>

<template>
  <ul>
    <teams-item
      v-for="team in teams"
      :key="team.id"
      :name="team.name"
      :member-count="team.members.length"
    ></teams-item>
  </ul>
</template>


<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 40rem;
  padding: 0;
}
</style>
