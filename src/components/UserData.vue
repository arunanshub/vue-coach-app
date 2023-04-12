<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'add-user', name: string, age: number): void
}>()

const name = ref('')
const age = ref<number | undefined>()

function addUser(name: string, age?: number) {
  emit('add-user', name, age || 0)
}
</script>

<template>
  <div>
    <label>Name </label>
    <input type="text" v-model="name" placeholder="your name" />
  </div>
  <div>
    <label>Age </label>
    <input type="number" v-model="age" placeholder="your age" />
  </div>

  <button type="button" @click="addUser(name, age)">Change Data</button>
</template>
