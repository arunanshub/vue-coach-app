<script setup lang="ts">
import { inject } from 'vue';

defineProps<{
  id: string
  topicName: string
  description: string
}>()

const selectTopic = inject<(id: string) => void>('selectTopic')
</script>

<template>
  <li>
    <h3>{{ topicName }}</h3>
    <p>{{ description }}</p>
    <button @click="selectTopic && selectTopic(id)">Learn More</button>
  </li>
</template>
