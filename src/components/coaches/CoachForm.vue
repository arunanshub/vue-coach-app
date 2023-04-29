<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, Form, useForm } from 'vee-validate'
import { array, number, object, string } from 'zod'

import BaseButton from '../ui/BaseButton.vue'

const { handleSubmit, values, errors, isSubmitting } = useForm({
  validationSchema: toTypedSchema(
    object({
      firstName: string().trim().min(1),
      lastName: string().trim().min(1),
      description: string().trim().min(1),
      hourlyRate: number({
        coerce: true,
        invalid_type_error: 'Must be a valid number',
      })
        .positive()
        .safe(),
      areas: array(string()).min(1),
    })
  ),
})
export type FormData = typeof values

const emit = defineEmits<{
  (e: 'save-data', data: FormData): void
}>()

const onSubmit = handleSubmit((submitted) => {
  emit('save-data', { ...submitted })
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="form-control" :class="{ invalid: !!errors.firstName }">
      <label for="firstName"> First Name </label>
      <Field name="firstName" />
      <ErrorMessage name="firstName" as="p" />
    </div>

    <div class="form-control" :class="{ invalid: !!errors.lastName }">
      <label for="lastName">Last Name</label>
      <Field name="lastName" />
      <ErrorMessage name="lastName" as="p" />
    </div>

    <div class="form-control" :class="{ invalid: !!errors.description }">
      <label for="description">Description</label>
      <Field as="textarea" rows="4" name="description" />
      <ErrorMessage name="description" as="p" />
    </div>

    <div class="form-control" :class="{ invalid: !!errors.hourlyRate }">
      <label for="hourlyRate">Hourly Rate</label>
      <Field name="hourlyRate" type="number" />
      <ErrorMessage name="hourlyRate" as="p" />
    </div>

    <div class="form-control" :class="{ invalid: !!errors.areas }">
      <h3>Areas of Expertise</h3>

      <div>
        <Field
          name="areas"
          type="checkbox"
          value="frontend"
          class="frontend"
          id="frontend"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <Field
          name="areas"
          type="checkbox"
          value="backend"
          class="career"
          id="backend"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <Field
          name="areas"
          type="checkbox"
          value="career"
          class="career"
          id="career"
        />
        <label for="career">Career Advisory</label>
      </div>

      <ErrorMessage name="areas" as="p" />
    </div>

    <BaseButton :disabled="isSubmitting">Register</BaseButton>
  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
