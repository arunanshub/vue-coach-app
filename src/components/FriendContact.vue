<script setup lang="ts">
import { ref, type PropType } from 'vue'

export interface Friend {
  id: string
  name: string
  phone: string
  email: string
}

const props = defineProps({
  friend: { type: Object as PropType<Friend>, required: true },
  isFavourite: { type: Boolean },
})

const detailsAreVisible = ref(false)
const friendIsFavourite = ref(props.isFavourite)

function toggleDetails() {
  detailsAreVisible.value = !detailsAreVisible.value
}

const toggleFavourite = () => {
  friendIsFavourite.value = !friendIsFavourite.value
}
</script>

<template>
  <h2>{{ friend.name }} {{ friendIsFavourite ? '(favourite)' : '' }}</h2>
  <button @click="toggleFavourite">Toggle favourite</button>
  <button @click="toggleDetails">{{ detailsAreVisible ? 'Hide' : 'Show' }} Details</button>
  <ul v-if="detailsAreVisible">
    <li><strong>Phone:</strong> {{ friend.phone }}</li>
    <li><strong>Email:</strong> {{ friend.email }}</li>
  </ul>
</template>
