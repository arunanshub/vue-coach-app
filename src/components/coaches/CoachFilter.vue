<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import BaseCard from '@/components/ui/BaseCard.vue'

export interface AreaFilter {
  [key: string]: boolean
}

const filters = reactive<AreaFilter>({
  frontend: true,
  backend: true,
  career: true,
})

const emit = defineEmits<{
  (e: 'change-filter', filter: AreaFilter): void
}>()

function setFilter() {
  emit('change-filter', { ...filters })
}

// ad
onMounted(() => emit('change-filter', { ...filters }))
</script>

<template>
  <BaseCard>
    <h2>Find your Coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        id="frontend"
        v-model="filters.frontend"
        @change="setFilter"
      />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="backend"
        v-model="filters.backend"
        @change="setFilter"
      />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        id="career"
        v-model="filters.career"
        @change="setFilter"
      />
      <label for="career">Career</label>
    </span>
  </BaseCard>
</template>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
