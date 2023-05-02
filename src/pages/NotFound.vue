<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
</script>

<template>
  <BaseCard>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>
      The page was not found. How about you check out
      <NavLink to-name="coaches">the coaches?</NavLink>
    </p>
  </BaseCard>
</template>
