<template>
  <div v-if="product && Object.keys(product).length > 0">
    <h1>{{ product.title }}</h1>
    <img :src="product.image" alt="product image" />
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
  </div>
  <div v-else>
    Loading product...
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({})
  }
});
</script>
