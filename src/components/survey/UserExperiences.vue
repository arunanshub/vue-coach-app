<script setup lang="ts">
import BaseButton from '../UI/BaseButton.vue'
import BaseCard from '../UI/BaseCard.vue'
import SurveyResult from './SurveyResult.vue'
import type { SurveyData } from '@/App.vue'
import axios, { AxiosError } from 'axios'
import { onMounted, ref } from 'vue'

type Result = {
  [key: string]: SurveyData
}
const results = ref<SurveyData[]>([])
const isLoading = ref(false)
const error = ref<string>()

async function loadExperiences() {
  isLoading.value = true
  error.value = undefined

  let response
  try {
    response = await axios.get<Result>(
      'https://vue-http-demo-66f0a-default-rtdb.asia-southeast1.firebasedatabase.app/surveys.json'
    )
    isLoading.value = false
  } catch (e) {
    isLoading.value = false
    const reqError = e as AxiosError
    error.value = `Failed to fetch data - try again later (${reqError.message})`
    return
  }

  if (!response.data) {
    return
  }
  results.value = Object.values(response.data).reverse()
}

onMounted(async () => await loadExperiences())
</script>

<template>
  <section>
    <BaseCard>
      <h2>Submitted Experiences</h2>
      <div>
        <BaseButton @click="loadExperiences"
          >Load Submitted Experiences</BaseButton
        >
      </div>
      <p v-if="isLoading">Loading...</p>
      <p v-else-if="!isLoading && error">
        {{ error }}
      </p>
      <p v-else-if="!isLoading && !results.length">
        No Experiences yet. Start filling some surveys.
      </p>
      <ul v-else>
        <SurveyResult
          v-for="result in results"
          :key="result.id"
          :name="result.name"
          :rating="result.rating"
        ></SurveyResult>
      </ul>
    </BaseCard>
  </section>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
