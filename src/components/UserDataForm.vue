<script setup lang="ts">
import BaseContainer from './BaseContainer.vue'
import { useCounterStore } from '@/stores/counter'
import { useUsersStore } from '@/stores/users'
import { ref } from 'vue'

const counter = useCounterStore()
const users = useUsersStore()

const name = ref('')
const age = ref<number>()
</script>

<template>
  <p>The current count is {{ counter.currentCount }}</p>
  <button @click="counter.$reset">Reset</button>
  <hr />

  <form class="container" @submit.prevent="users.addUser({ name, age: age! })">
    <label for="name">Name </label>
    <input v-model.trim="name" type="text" />
    <label for="age">Age </label>
    <input v-model="age" type="number" />
    <button :disabled="!name || !age">Add User</button>
  </form>

  <BaseContainer title="List of users">
    <ul>
      <li v-for="user in users.allUsers">
        {{ user.name }} is {{ user.age }} years old
      </li>
    </ul>
  </BaseContainer>
</template>

<style scoped>
.container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: [label] auto [input] 1fr;
}

input {
  grid-column: input;
  align-self: center;
}

label {
  grid-column: label;
  align-self: center;
}
</style>
