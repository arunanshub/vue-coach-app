<script setup lang="ts">
import { useAuthStore } from './stores/auth'
import { useUsersStore } from '@/stores/users'
import { computed } from 'vue'

import TheCounter from './components/TheCounter.vue'
import BaseContainer from '@/components/BaseContainer.vue'
import UserAuth from '@/components/UserAuth.vue'
import UserDataForm from '@/components/UserDataForm.vue'

const users = useUsersStore()
const auth = useAuthStore()

const latestUser = computed(() => users.latestUser)
</script>

<template>
  <BaseContainer title="Auth">
    <UserAuth />
  </BaseContainer>

  <BaseContainer title="Pinia" v-if="auth.isLoggedIn">
    <TheCounter />
  </BaseContainer>

  <BaseContainer title="Add User Data" v-if="auth.isLoggedIn">
    <UserDataForm />
  </BaseContainer>

  <BaseContainer title="Latest User Data">
    <p v-if="latestUser">
      Latest user: {{ latestUser.name }} who is {{ latestUser.age }} yo.
    </p>
    <p v-else>No user data yet.</p>
  </BaseContainer>
</template>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
