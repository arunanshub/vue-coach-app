<script setup lang="ts">
import LearningResource from './LearningResource.vue'
import type { Resource } from '@/App.vue'
import { inject } from 'vue'

// injected from TheResources
const resources = inject<Resource[]>('resources', [])
</script>

<template>
  <ul>
    <LearningResource v-for="res in resources" :key="res.id" :resource="res" />
  </ul>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  margin: auto;
  max-width: 40rem;
}
</style>
