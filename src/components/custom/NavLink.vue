<script setup lang="ts">
/**
 * A Custom RouterLink that uses name of route for navigation.
 */
import { RouterView } from 'vue-router'

defineProps({
  toName: {
    type: String,
    required: true,
  },
  params: {
    // @ts-ignore
    type: RouterView.props.params,
  },
})
</script>

<template>
  <RouterLink :to="{ name: toName, params }">
    <slot />
  </RouterLink>
</template>
