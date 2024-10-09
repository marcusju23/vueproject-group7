<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
    <img :src="product.image" alt="product image" />

    <p><strong>Category:</strong> {{ product.category }}</p>
    <p>{{ product.description }}</p>
    <p><strong>Price:</strong> ${{ product.price }}</p>
    <p><strong>Rating:</strong> {{ product.rating?.rate }} / 5 ({{ product.rating?.count }} reviews)</p>

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
import { apiService } from '@/api/apiService';

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

<style scoped>
img {
  max-width: 100%;
  height: auto;
  margin-bottom: 16px;
}

h1 {
  font-size: 24px;
  margin-bottom: 16px;
}

p {
  font-size: 18px;
  margin-bottom: 12px;
}

button {
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #218838;
}
</style>
