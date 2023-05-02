<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import CoachFilter, {
  type AreaFilter,
} from '@/components/coaches/CoachFilter.vue'
import CoachItem from '@/components/coaches/CoachItem.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import BaseDialog from '@/components/ui/BaseDialog.vue'
import BaseSpinner from '@/components/ui/BaseSpinner.vue'
import { useAuthStore } from '@/stores/auth'
import { useCoachStore } from '@/stores/coaches'

const authStore = useAuthStore()

// get the coach store
const coachStore = useCoachStore()

// load the coaches here or set error message if error occurs
const errorMessage = ref<string>()
function loadCoaches(forceRefresh = false) {
  errorMessage.value = undefined
  coachStore.loadCoaches(forceRefresh).catch((error: Error) => {
    errorMessage.value = error.message
  })
}
loadCoaches()

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

const canRegisterAsCoach = computed(() => {
  return !coachStore.isLoading &&
    authStore.isLoggedIn &&
    !coachStore.isUserCoach(authStore.userId!)
})
</script>

<template>
  <div>
    <CoachFilter @change-filter="setFilters" />
    <BaseDialog
      :show="!!errorMessage"
      title="An Error Occurred!"
      @close="loadCoaches"
    >
      Failed to load coaches data: {{ errorMessage }}
    </BaseDialog>
    <BaseCard>
      <section>
        <div class="controls">
          <BaseButton mode="outline" @click="loadCoaches(true)">Refresh</BaseButton>
          <BaseButton to-name="register" v-if="canRegisterAsCoach">
            Register as Coach
          </BaseButton>
        </div>

        <BaseSpinner v-if="coachStore.isLoading" />
        <ul v-else-if="hasCoaches">
          <CoachItem
            v-for="coach in filteredCoaches"
            :coach="coach"
            :key="coach.id"
          />
        </ul>
        <h3 v-else>No coaches found.</h3>
      </section>
    </BaseCard>
  </div>
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
