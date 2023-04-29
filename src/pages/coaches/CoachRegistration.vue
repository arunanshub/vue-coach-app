<script setup lang="ts">
import { useRouter } from 'vue-router'

import CoachForm, { type FormData } from '@/components/coaches/CoachForm.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

import { useAuthStore } from '@/stores/auth'
import { useCoachStore } from '@/stores/coaches'

const router = useRouter()
const coachStore = useCoachStore()
const authStore = useAuthStore()

function registerCoach(data: FormData) {
  coachStore.register({
    id: authStore.userId,
    firstName: data.firstName!,
    lastName: data.lastName!,
    hourlyRate: data.hourlyRate!,
    description: data.description,
    areas: data.areas!,
  })
  router.replace({ name: 'coaches' })
}
</script>

<template>
  <section>
    <BaseCard>
      <h2>Register as coach now!</h2>
      <CoachForm @save-data="registerCoach" />
    </BaseCard>
  </section>
</template>
