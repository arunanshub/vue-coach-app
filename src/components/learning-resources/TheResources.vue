<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'
import BaseCard from '../ui/BaseCard.vue'
import AddResource from './AddResource.vue'
import StoredResources from './StoredResources.vue'
import type { Resource } from '@/App.vue'
import { KeepAlive, computed, provide, reactive, ref } from 'vue'

// manage tabs
type Tab = 'StoredResources' | 'AddResource'

const selectedTab = ref<Tab>('StoredResources')

function setSelectedTab(tab: Tab) {
  selectedTab.value = tab
}

const tabs = {
  StoredResources,
  AddResource,
}

// tab button style switching
const storedResButtonMode = computed(() => {
  return selectedTab.value === 'StoredResources' ? null : 'flat'
})

const addResButtonMode = computed(() => {
  return selectedTab.value === 'AddResource' ? null : 'flat'
})

// resources data
const storedResources = reactive<Resource[]>([
  {
    id: 'official-guide',
    title: 'Official Guide',
    description: 'Official Vue.js guide',
    link: 'https://vuejs.org',
  },
  {
    id: 'google',
    title: 'Google',
    description: 'Google is important',
    link: 'https://google.com',
  },
])
provide('resources', storedResources)

function addResource(resource: Resource) {
  storedResources.unshift(resource)
  selectedTab.value = 'StoredResources'
}
provide('addResource', addResource)

function removeResource(id: string) {
  const resIndex = storedResources.findIndex((res) => res.id === id)
  storedResources.splice(resIndex, 1)
}
provide('removeResource', removeResource)
</script>

<template>
  <BaseCard>
    <BaseButton
      @click="setSelectedTab('StoredResources')"
      :mode="storedResButtonMode"
    >
      Stored Resources
    </BaseButton>
    <BaseButton @click="setSelectedTab('AddResource')" :mode="addResButtonMode">
      Add Resource
    </BaseButton>
  </BaseCard>
  <KeepAlive>
    <component :is="tabs[selectedTab]"></component>
  </KeepAlive>
</template>
