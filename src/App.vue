<script lang="ts">
export const enum Rating {
  Poor = 'poor',
  Average = 'average',
  Great = 'great',
}
</script>

<script setup lang="ts">
import LearningSurvey from './components/survey/LearningSurvey.vue'
import UserExperiences from './components/survey/UserExperiences.vue'

export interface SurveyData {
  id: string
  name: string
  rating: Rating
}
</script>

<template>
  <LearningSurvey></LearningSurvey>
  <UserExperiences></UserExperiences>
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
