<script lang="ts">
export const enum Rating {
  Poor = 'poor',
  Average = 'average',
  Great = 'great',
}
</script>

<script setup lang="ts">
defineProps<{ modelValue?: Rating }>()
const emit = defineEmits<{
  (e: 'update:model-value', rating: Rating): void
}>()

function activate(rating: Rating) {
  emit('update:model-value', rating)
}
</script>

<template>
  <ul>
    <li :class="{ active: modelValue === Rating.Poor }">
      <button type="button" @click="activate(Rating.Poor)">Poor</button>
    </li>
    <li :class="{ active: modelValue === Rating.Average }">
      <button type="button" @click="activate(Rating.Average)">Average</button>
    </li>
    <li :class="{ active: modelValue === Rating.Great }">
      <button type="button" @click="activate(Rating.Great)">Great</button>
    </li>
  </ul>
</template>
<style scoped>
.active {
  border-color: #a00078;
}

.active button {
  color: #a00078;
}

ul {
  list-style: none;
  margin: 0.5rem 0;
  padding: 0;
  display: flex;
}

li {
  margin: 0 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

button {
  font: inherit;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
