<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
    <img :src="product.image" alt="product" />
    <p>{{ product.category }}</p>
    <p>{{ product.description }}</p>
    <p>${{ product.price }}</p>
    <p>{{ product.rating?.rate }} / 5 ({{ product.rating?.count }} reviews)</p>
    <button>Add to Cart</button>
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
