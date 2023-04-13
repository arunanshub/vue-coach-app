<script setup lang="ts">
import { reactive } from 'vue'

const goals = reactive(['finish course', 'learn vue'])
</script>

<template>
  <ul>
    <li v-for="goal in goals" :key="goal">
      <slot :item="goal"></slot>
      <slot name="f" :items="'e'"></slot>
    </li>
  </ul>
</template>
