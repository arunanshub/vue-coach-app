<script setup lang="ts">
defineProps<{
  topicTitle?: string
  text?: string
}>()
</script>

<template>
  <section>
    <h2>{{ topicTitle }}</h2>
    <p>{{ text }}</p>
  </section>
</template>
