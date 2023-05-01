<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { ErrorMessage, Field, useForm } from 'vee-validate'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'zod'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const isSignupPage = ref(false)

function toggleSignupPage() {
  isSignupPage.value = !isSignupPage.value
}

// a reactive form validation schema that changes state depending on whether we
// are sering a signup page or login page.
const reactiveSchema = computed(() => {
  // validates signup
  if (isSignupPage.value) {
    return object({
      email: string().email(),
      password: string().min(8, 'Password must contain atleast 8 characters'),
      confirm: string(),
    }).refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm'],
    })
  }
  // only validates login
  return object({
    email: string().email(),
    password: string().min(8, 'Password must contain atleast 8 characters'),
  })
})

// connect schema to form
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: computed(() => toTypedSchema(reactiveSchema.value)),
})

const isFormErrorFree = computed(() => {
  return Object.keys(errors.value).length === 0
})

// submission handler
const onSubmit = handleSubmit(async (submitted) => {
  console.log(submitted)
  try {
    if (isSignupPage.value) {
      await auth.signup(submitted.email, submitted.password)
    } else {
      await auth.login(submitted.email, submitted.password)
    }
  } catch (error) {
    // some error happened show modal
    console.log(error)
    // TODO: add modal
  }
  router.replace({ name: 'coaches' })
})
</script>

<template>
  <BaseCard>
    <form @submit="onSubmit">
      <div class="form-control">
        <label for="email">Email</label>
        <Field type="email" name="email" :validate-on-input="true" />
        <ErrorMessage as="p" name="email" />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <Field
          type="password"
          name="password"
          autocomplete="on"
          :validate-on-input="true"
        />
        <ErrorMessage as="p" name="password" />
      </div>
      <div class="form-control" v-if="isSignupPage">
        <label for="confirm">Repeat Password</label>
        <Field
          type="password"
          name="confirm"
          autocomplete="on"
          :validate-on-input="true"
        />
        <ErrorMessage as="p" name="confirm" />
      </div>

      <BaseButton :disabled="!isFormErrorFree || isSubmitting">
        {{ isSignupPage ? 'Sign Up' : 'Login' }}
      </BaseButton>
      <BaseButton type="button" mode="flat" @click="toggleSignupPage">
        {{ isSignupPage ? 'Login' : 'Sign Up' }} instead
      </BaseButton>
    </form>
  </BaseCard>
</template>

<style scoped>
form {
  margin: 1rem;
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
