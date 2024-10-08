<template>
  <router-link :to="`/product/${product.id}`">
    <div class="product-card">
      <img :src="product.images[0]" alt="product" class="product-image"/>
      <h3 class="product-h3">{{ product.title }}</h3>
      <p class="product-price">${{ product.price }}</p>
    </div>
  </router-link>
</template>

<script setup>
defineProps(['product']);
</script>
