<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseDialog from '../ui/BaseDialog.vue'
import type { Resource } from '@/App.vue'
import { Teleport, inject, reactive, ref } from 'vue'

const isInputInvalid = ref(false)
const newResource = reactive<Resource>({
  id: '',
  title: '',
  description: '',
  link: '',
})

// injected from `TheResources`
const addResource = inject<(r: Resource) => void>('addResource', (_) => {})

function submitData() {
  newResource.id = new Date().toISOString()

  const resource = newResource as { [key: string]: string }
  for (const key in newResource) {
    if (!resource[key]) {
      isInputInvalid.value = true
      return
    }
  }
  addResource({ ...newResource })
}

function confirmError() {
  isInputInvalid.value = false
}
</script>

<template>
  <BaseDialog v-if="isInputInvalid" title="Invalid Input" @close="confirmError">
    <template #default>
      <p>Atleast one input is invalid.</p>
      <p>Please check all inputs.</p>
    </template>
    <template #actions>
      <BaseButton @click="confirmError">Okay</BaseButton>
    </template>
  </BaseDialog>

  <BaseCard>
    <form @submit.prevent="submitData">
      <div class="form-control">
        <label for="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          v-model.trim="newResource.title"
        />
      </div>

      <div class="form-control">
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          type="text"
          rows="3"
          v-model.trim="newResource.description"
        />
      </div>

      <div class="form-control">
        <label for="link">Link</label>
        <input
          id="link"
          name="link"
          type="url"
          v-model.trim="newResource.link"
        />
      </div>

      <div class="form-control">
        <BaseButton type="submit">Add Resource</BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

<style scoped>
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  padding: 0.15rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #f7ebff;
}

.form-control {
  margin: 1rem 0;
}
</style>
