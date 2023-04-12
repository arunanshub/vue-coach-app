<script setup lang="ts">
import { ref } from 'vue'

import './assets/form.css'
import './assets/styles.css'

import ActiveUser from './components/ActiveUser.vue'
import UserData from './components/UserData.vue'

const userName = ref('')
const userAge = ref<number | undefined>()

function chageUserData(name: string, age?: number) {
  userName.value = name
  userAge.value = age
}
</script>

<template>
  <ActiveUser :age="userAge" :name="userName" />
  <ul>
    <li>
      <UserData @add-user="chageUserData" />
    </li>
  </ul>
</template>
