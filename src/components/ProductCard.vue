<template>
  <RouterLink :to="`/product/${product.id}`">
    <div class="product-card">
      <img :src="product.image" alt="product" class="product-image"/>
      <h3 class="product-h3">{{ product.title }}</h3>
      <p>{{ product.description }}</p>
      <p class="product-price">${{ product.price }}</p>
    </div>
  </RouterLink>
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
