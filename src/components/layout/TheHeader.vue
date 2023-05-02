<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import BaseButton from '../ui/BaseButton.vue'

const authStore = useAuthStore()
const router = useRouter()

async function onLogout() {
  await authStore.logout()
  router.replace({ name: 'coaches' })
}
</script>

<template>
  <header>
    <nav>
      <h1>
        <NavLink to-name="coaches">Find a Coach</NavLink>
      </h1>
      <ul>
        <li><NavLink to-name="coaches">All Coaches</NavLink></li>
        <li>
          <NavLink v-if="authStore.isLoggedIn" to-name="requests">
            Requests
          </NavLink>
          <NavLink v-else to-name="auth">Login</NavLink>
        </li>
        <li v-if="authStore.isLoggedIn">
          <BaseButton @click.once="onLogout">Log Out</BaseButton>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
}
</style>
