<script setup lang="ts">
import { reactive } from 'vue'

import type { Friend } from './FriendContact.vue'

const newFriend = reactive({
  name: '',
  id: '',
  email: '',
  phone: '',
  isFavorite: false,
})

const emit = defineEmits<{
  (e: 'friend-added', friend: Friend): void
}>()

function addFriend(data: Friend) {
  emit('friend-added', { ...data })
}
</script>

<template>
  <h2>Add a friend</h2>

  <form ref="myform" @submit.prevent="addFriend(newFriend)">
    <div>
      <label>id</label>
      <input v-model="newFriend.id" />
    </div>

    <div>
      <label>Name:</label>
      <input v-model="newFriend.name" />
    </div>

    <div>
      <label>Phone:</label>
      <input v-model="newFriend.phone" type="tel" />
    </div>

    <div>
      <label>Email:</label>
      <input v-model="newFriend.email" type="email" />
    </div>

    <div>
      <button>Add friend</button>
    </div>
  </form>
</template>
