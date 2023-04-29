<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import CoachFilter, {
  type AreaFilter,
} from '@/components/coaches/CoachFilter.vue'
import CoachItem from '@/components/coaches/CoachItem.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

import { useCoachStore } from '@/stores/coaches'

// get the coach data
const coachStore = useCoachStore()
const { coaches, hasCoaches } = storeToRefs(coachStore)

// the `areas` filters that are currently applied to the Coaches list.
const activeFilters = ref<AreaFilter>({})
function setFilters(updatedFilters: AreaFilter) {
  activeFilters.value = updatedFilters
}

const filteredCoaches = computed(() => {
  const activeFiltersList = activeFilters.value
  return coaches.value.filter((coach) => {
    return coach.areas.some((area) => {
      return activeFiltersList[area]
    })
  })
})
</script>

<template>
  <CoachFilter @change-filter="setFilters" />
  <BaseCard>
    <section>
      <div class="controls">
        <BaseButton mode="outline">Refresh</BaseButton>
        <BaseButton to-name="register" v-if="!coachStore.isUserCoach">
          Register as Coach
        </BaseButton>
      </div>
      <ul v-if="hasCoaches">
        <CoachItem
          v-for="coach in filteredCoaches"
          :coach="coach"
          :key="coach.id"
        />
      </ul>
      <h3 v-else>No coaches found.</h3>
    </section>
  </BaseCard>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
