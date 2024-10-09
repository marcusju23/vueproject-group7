<template>
  <div class="product-card">
    <a :href="`/product/${product.id}`" class="product-link">
      <img :src="product.image" alt="product image" class="product-image" />
      <h1>{{ product.title }}</h1>
      <p>{{ product.description }}</p>
      <p>Price: ${{ product.price }}</p>
    </a>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => ({})  // Default empty object
  }
});
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-card:hover {
  transform: scale(1.05);
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
}

.product-link {
  text-decoration: none;
  color: inherit;
}

h1 {
  font-size: 18px;
  margin: 10px 0;
}

p {
  font-size: 14px;
  color: #666;
}
</style>
