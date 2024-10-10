<template>
  <RouterLink :to="`/product/${product.id}`">
    <div class="product-card h-full flex flex-col justify-between">
      <img class="product-image" :src="product.image" alt="product" />
      <h3 class="product-title line-clamp-2 h-10 m2">{{ product.title }}</h3>
      <div class="bottom-div flex-grow flex items-center justify-center">
        <span class="product-price">${{ product.price }}</span>
      </div>
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
