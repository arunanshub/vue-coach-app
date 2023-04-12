<script setup lang="ts">
defineProps<{
  name: string
  age?: number
}>()
</script>

<template>
  <ul>
    <li>
      <h2>Name: {{ name }}</h2>
      <h3>Age: {{ age }}</h3>
    </li>
  </ul>
</template>
