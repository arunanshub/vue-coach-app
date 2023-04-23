<template>
  <section>
    <ul>
      <ProductItem
        v-for="prod in products"
        :key="prod.id"
        :id="prod.id"
        :title="prod.title"
        :image="prod.image"
        :description="prod.description"
        :price="prod.price"
      ></ProductItem>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'

import ProductItem from '@/components/products/ProductItem.vue'

const store = useProductsStore()
const { products } = storeToRefs(store)
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 40rem;
}
</style>
