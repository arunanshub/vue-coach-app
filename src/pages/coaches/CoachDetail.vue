<script setup lang="ts">
import { computed } from 'vue'

import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

import { useCoachStore } from '@/stores/coaches'

const props = defineProps<{ id: string }>()
const coachStore = useCoachStore()

const coach = coachStore.getCoach(props.id)
const fullName = computed(() => `${coach?.firstName} ${coach?.lastName}`)
</script>

<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>${{ coach?.hourlyRate }}/hour</h3>
    </BaseCard>
  </section>

  <section>
    <BaseCard>
      <header>
        <h2>Interested? Reach out now!</h2>
        <BaseButton to-name="contact" :props="{ id: coach?.id }">
          Contact
        </BaseButton>
      </header>
      <RouterView />
    </BaseCard>
  </section>

  <section>
    <BaseCard>
      <BaseBadge
        v-for="area in coach?.areas"
        :key="area"
        :type="area"
        :title="area"
      />
      <p>{{ coach?.description }}</p>
    </BaseCard>
  </section>
</template>
