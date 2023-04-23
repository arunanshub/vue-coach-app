<script lang="ts">
interface CartItem {
  productId: string
  title: string
  image: string
  price: number
  qty: number
}

export interface Cart {
  items: CartItem[]
  total: number
  qty: number
}

export interface Product {
  id: string
  image: string
  title: string
  description: string
  price: number
}
</script>

<script setup lang="ts">
import TheHeader from './components/nav/TheHeader.vue'
</script>

<template>
  <TheHeader />
  <RouterView />
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
