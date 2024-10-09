<template>
  <div v-if="product">
    <h1 class="product-title">{{ product.title }}</h1>
    <img class="product-image" :src="product.image" alt="product" />
    <p class="product-category">{{ product.category }}</p>
    <p class="product-description">{{ product.description }}</p>
    <p class="product-price">${{ product.price }}</p>
    <p class="product-rating">{{ product.rating?.rate }} / 5 ({{ product.rating?.count }} reviews)</p>
    <button class="add-to-cart-btn">Add to Cart</button>
  </div>
  <div v-else-if="error">
    <p>Product not found!</p>
  </div>
  <div v-else>
    Loading product details...
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { apiService } from '@/api/apiService.js';

const route = useRoute();
const product = ref(null);
const error = ref(false);

onMounted(async () => {
  const productId = route.params.id;
  try {
    const data = await apiService.getProductById(productId);
    if (data) {
      product.value = data;
    } else {
      error.value = true;
    }
  } catch (err) {
    console.error('Error fetching product details:', err);
    error.value = true;
  }
});
</script>
