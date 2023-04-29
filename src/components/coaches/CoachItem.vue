<script setup lang="ts">
import { computed, ref } from 'vue'

import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

import type { Coach } from '@/stores/coaches'

const props = defineProps<{ coach: Coach }>()
const fullName = computed(
  () => `${props.coach.firstName} ${props.coach.lastName}`
)

const show = ref(true)
</script>

<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ coach.hourlyRate }}/hour</h4>
    <div>
      <BaseBadge
        v-for="area in coach.areas"
        :type="area"
        :title="area"
        :key="area"
      >
        {{ area }}
      </BaseBadge>
    </div>
    <div class="actions">
      <BaseButton to-name="contact" :params="{ id: coach.id }" mode="outline">
        Contact
      </BaseButton>
      <BaseButton to-name="coach" :params="{ id: coach.id }">
        View Details
      </BaseButton>
    </div>
  </li>
</template>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
