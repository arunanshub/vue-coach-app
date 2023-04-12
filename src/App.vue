<script setup lang="ts">
import { ref } from 'vue'

import './assets/form.css'
import './assets/styles.css'

import type { Friend } from './components/FriendContact.vue'
import FriendContact from './components/FriendContact.vue'
import NewFriend from './components/NewFriend.vue'

const friendsList: Friend[] = [
  {
    id: 'manuel',
    name: 'Manuel Lorenz',
    phone: '0123 1212',
    email: 'manuel@dd.com',
    isFavorite: false,
  },
  {
    id: 'julie',
    name: 'Julie Jones',
    phone: '12121 121 21',
    email: 'ff@gg.com',
    isFavorite: true,
  },
]
const friends = ref(friendsList)

function toggleFavoriteStatus(id: string) {
  const theFriend = friends.value.find((friend) => friend.id === id)
  if (theFriend) {
    theFriend.isFavorite = !theFriend.isFavorite
  }
}

function addFriend(friend: Friend) {
  friends.value.push(friend)
}

function deleteFriend(id: string) {
  friends.value = friends.value.filter((friend) => friend.id !== id)
}
</script>

<template>
  <header>
    <h1>My Friends</h1>
  </header>

  <ul>
    <li>
      <NewFriend @friend-added="addFriend" />
    </li>

    <li v-for="friend in friends" :key="friend.id">
      <FriendContact
        :friend="friend"
        @is-favorite="toggleFavoriteStatus"
        @delete-friend="deleteFriend"
      />
    </li>
  </ul>
</template>
