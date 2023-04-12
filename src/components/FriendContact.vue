<script setup lang="ts">
import { type PropType, ref } from 'vue'

export interface Friend {
  id: string
  name: string
  phone: string
  email: string
  isFavorite: boolean
}

defineProps({
  friend: {
    type: Object as PropType<Friend>,
    required: true,
  },
})

const emit = defineEmits<{
  (e: 'is-favorite', id: string): void
  (e: 'delete-friend', id: string): void
}>()

const detailsAreVisible = ref(false)

function toggleDetails() {
  detailsAreVisible.value = !detailsAreVisible.value
}

function deleteFriend(id: string) {
  emit('delete-friend', id)
}

const toggleFavourite = (id: string) => {
  emit('is-favorite', id)
}
</script>

<template>
  <h2>{{ friend.name }} {{ friend.isFavorite ? '(favourite)' : '' }}</h2>
  <button @click="toggleFavourite(friend.id)">Toggle favourite</button>
  <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show' }} Details</button>
  <ul v-if="detailsAreVisible">
    <li><strong>Phone:</strong> {{ friend.phone }}</li>
    <li><strong>Email:</strong> {{ friend.email }}</li>
  </ul>
  <button @click="deleteFriend(friend.id)">Delete</button>
</template>
