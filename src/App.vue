<script setup lang="ts">
import '@/assets/app.css'

import TheHeader from './components/layouts/TheHeader.vue'
import TheResources from './components/learning-resources/TheResources.vue'

export interface Resource {
  id: string
  title: string
  description: string
  link: string
}
</script>

<template>
  <TheHeader title="Remember Me" />
  <TheResources />
</template>
