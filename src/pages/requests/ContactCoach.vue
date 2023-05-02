<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { object, string } from 'zod'
import BaseButton from '@/components/ui/BaseButton.vue'
import { useRequestsStore } from '@/stores/requests'

const { handleSubmit, isSubmitting, errors } = useForm({
  validationSchema: toTypedSchema(
    object({
      email: string().email(),
      message: string()
        .trim()
        .min(1, { message: 'Message must not be empty.' }),
    })
  ),
})

const isFormErrorFree = computed(() => {
  return Object.keys(errors.value).length === 0
})

const requestsStore = useRequestsStore()
const route = useRoute()
const router = useRouter()

const onSubmit = handleSubmit(async (submitted) => {
  await requestsStore.submitRequest({
    coachId: route.params.id as string,
    userEmail: submitted.email,
    message: submitted.message,
  })
  router.replace({ name: 'coach', params: { id: route.params.id } })
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="form-control">
      <label for="email">Your Email</label>
      <Field name="email" type="email" :validate-on-input="true" />
      <ErrorMessage name="email" as="p" />
    </div>

    <div class="form-control">
      <label for="message">Message</label>
      <Field name="message" as="textarea" rows="5" :validate-on-input="true" />
      <ErrorMessage name="message" as="p" />
    </div>

    <div class="actions">
      <BaseButton :disabled="!isFormErrorFree || isSubmitting">
        Send Message
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
