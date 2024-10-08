<template>
  <div class="product-card">
    <img :src="product.images[0]" alt="product image" class="product-image"/>
    <h3>{{ product.title }}</h3>
    <p>{{ product.price }} $</p>
    <router-link :to="`/product/${product.id}`">View Details</router-link>
  </div>
</template>

<script setup>
defineProps(['product']);
</script>
