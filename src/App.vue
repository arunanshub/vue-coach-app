<script setup lang="ts">
import { KeepAlive, ref } from 'vue'

import ActiveGoals from '@/components/ActiveGoals.vue'
import ManageGoals from '@/components/ManageGoals.vue'
import TheHeader from '@/components/TheHeader.vue'

type Components = 'ActiveGoals' | 'ManageGoals' | 'TheHeader'
const selectedComponent = ref<Components>('ActiveGoals')

const components = {
  ActiveGoals,
  ManageGoals,
  TheHeader,
}

function setSelectedComponent(name: Components) {
  selectedComponent.value = name
}
</script>

<template>
  <div>
    <TheHeader v-once />

    <button @click="setSelectedComponent('ActiveGoals')">Active Goals</button>
    <button @click="setSelectedComponent('ManageGoals')">Manage Goals</button>
    <button @click="setSelectedComponent('TheHeader')">TheHeader Goals</button>

    <KeepAlive>
      <component :is="components[selectedComponent]"></component>
    </KeepAlive>
  </div>
</template>

<style>
html {
  font-family: sans-serif;
}

body {
  margin: 0;
}
</style>
