<script setup lang="ts">
import KnowledgeElement from './KnowledgeElement.vue'
import type { Topic } from '@/App.vue'
import { inject } from 'vue'

const topics: Topic[] = inject('topics', [])
</script>

<template>
  <ul>
    <KnowledgeElement
      v-for="topic in topics"
      :key="topic.id"
      :id="topic.id"
      :topic-name="topic.title"
      :description="topic.description"
    />
  </ul>
</template>
