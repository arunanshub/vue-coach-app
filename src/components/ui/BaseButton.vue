<script setup lang="ts">
import type { PropType } from 'vue'
import { RouterView } from 'vue-router'

defineProps({
  toName: {
    type: String,
    required: false,
  },
  mode: {
    type: String as PropType<'flat' | 'outline'>,
    required: false,
  },
  params: {
    // @ts-ignore
    type: RouterView.props.params,
  },
})
</script>

<template>
  <button v-if="!toName" :class="mode">
    <slot></slot>
  </button>
  <NavLink v-else :to-name="toName" :params="params" :class="mode">
    <slot></slot>
  </NavLink>
</template>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

button:disabled {
  background-color: #c6c6c6;
  border-color: #c6c6c6;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
