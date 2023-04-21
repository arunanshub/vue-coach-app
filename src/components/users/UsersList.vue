<script setup lang="ts">
import UserItem from './UserItem.vue'
import type { User } from '@/App.vue'
import { inject } from 'vue'

const users = inject<User[]>('users', [])
</script>

<template>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
