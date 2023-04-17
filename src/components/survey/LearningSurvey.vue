<script setup lang="ts">
import BaseButton from '../UI/BaseButton.vue'
import BaseCard from '../UI/BaseCard.vue'
import type { Rating } from '@/App.vue'
import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

const enteredName = ref('')
const chosenRating = ref<Rating>()
const invalidInput = ref(false)
const error = ref('')

async function submitSurvey() {
  invalidInput.value = !enteredName.value || !chosenRating.value
  if (invalidInput.value) {
    return
  }

  try {
    await axios.post(
      'https://vue-http-demo-66f0a-default-rtdb.asia-southeast1.firebasedatabase.app/surveys.json',
      {
        name: enteredName.value,
        rating: chosenRating.value,
      }
    )
  } catch (e) {
    const reqError = e as AxiosError
    error.value = `Failed to send data: ${reqError.message}`
  }
  enteredName.value = ''
  chosenRating.value = undefined
}
</script>

<template>
  <section>
    <BaseCard>
      <h2>How was you learning experience?</h2>
      <form @submit.prevent="submitSurvey">
        <div class="form-control">
          <label for="name">Your Name</label>
          <input
            id="name"
            v-model.trim.lazy="enteredName"
            type="text"
            name="name"
          />
        </div>
        <h3>My learning experience was ...</h3>
        <div class="form-control">
          <input
            id="rating-poor"
            v-model="chosenRating"
            type="radio"
            value="poor"
            name="rating"
          />
          <label for="rating-poor">Poor</label>
        </div>
        <div class="form-control">
          <input
            id="rating-average"
            v-model="chosenRating"
            type="radio"
            value="average"
            name="rating"
          />
          <label for="rating-average">Average</label>
        </div>
        <div class="form-control">
          <input
            id="rating-great"
            v-model="chosenRating"
            type="radio"
            value="great"
            name="rating"
          />
          <label for="rating-great">Great</label>
        </div>
        <p v-if="invalidInput">
          One or more input fields are invalid. Please check your provided data.
        </p>
        <p v-if="error">{{ error }}</p>
        <div>
          <BaseButton>Submit</BaseButton>
        </div>
      </form>
    </BaseCard>
  </section>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

input[type='text'] {
  display: block;
  width: 20rem;
  margin-top: 0.5rem;
}
</style>
