<script setup lang="ts">
import BaseContainer from './BaseContainer.vue'
import { useCounterStore } from '@/stores/counter'
import { ref } from 'vue'

const counter = useCounterStore()
const count = ref(0)
</script>
<template>
  <h3>{{ counter.currentCount }}</h3>
  <button @click="counter.increment()">Add 1</button>
  <button @click="counter.incrementWithDelay()">Add 1 with delay</button>

  <BaseContainer title="Set Counter Value">
    <label for="">Enter new count: </label>
    <input v-model="count" type="number" />
    <button @click="counter.setValue(count)">Set counter value</button>
  </BaseContainer>
</template>
