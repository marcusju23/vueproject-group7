<template>
  <RouterLink :to="`/product/${product.id}`">
    <div class="product-card">
      <img class="product-image" :src="product.image" alt="product"/>
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ product.description }}</p>
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
