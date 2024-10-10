<template>
  <div class="product-list">
    <ProductCard v-for="(product, index) in products" :key="index" :product="product"/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { apiService } from '@/api/apiService';


const products = ref([]);


onMounted(async () => {
  try {
    const data = await apiService.getProducts();
    if (Array.isArray(data)) {
      products.value = data;
    } else {
      console.error('Unexpected data format:', data);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});
</script>
