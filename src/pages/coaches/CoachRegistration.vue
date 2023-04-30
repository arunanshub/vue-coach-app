<script setup lang="ts">
import { useRouter } from 'vue-router'

import CoachForm from '@/components/coaches/CoachForm.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const router = useRouter()

async function hasSubmitted() {
  router.replace({ name: 'coaches' })
}
</script>

<template>
  <section>
    <BaseCard>
      <h2>Register as coach now!</h2>
      <CoachForm @has-submitted="hasSubmitted" />
    </BaseCard>
  </section>
</template>
