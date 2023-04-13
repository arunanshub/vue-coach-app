<script setup lang="ts">
import ErrorAlert from './ErrorAlert.vue'
import { Teleport, ref } from 'vue'

const goal = ref('')
const currentGoal = ref('')
const inputIsInvalid = ref(false)

function setGoal() {
  if (!goal.value) {
    inputIsInvalid.value = true
  }
  currentGoal.value = goal.value
}
</script>
<template>
  <div>
    <h2>Manage Goals</h2>
    <input type="text" placeholder="enter your peepee" v-model="goal" />
    <button @click="setGoal">Set Goal</button>

    <Teleport to="body">
      <ErrorAlert v-if="inputIsInvalid">
        <h2>Input is invalid</h2>
        <p>Please enter value</p>
        <button @click="inputIsInvalid = false">Okay</button>
      </ErrorAlert>
    </Teleport>
    <p v-if="currentGoal">{{ currentGoal }}</p>
  </div>
</template>
