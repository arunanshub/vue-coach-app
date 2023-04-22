<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <button v-if="!auth.isLoggedIn" @click="auth.login()">Login</button>
  <button v-else @click="auth.logout()">Logout</button>
</template>
