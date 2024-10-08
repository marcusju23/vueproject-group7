<template>
  <div class="product-list">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { apiService } from '@/api/apiService.js';
import ProductCard from '@/components/ProductCard.vue';

// Reactive products array
const products = ref([]);

// Fetch products when the component is mounted
onMounted(async () => {
  try {
    const fetchedProducts = await apiService.getProducts();
    console.log(fetchedProducts); // Check if products are being fetched
    products.value = fetchedProducts; // Assign fetched products to reactive array
  } catch (error) {
    console.error('Error fetching products:', error); // Catch and log any errors
  }
});
</script>
