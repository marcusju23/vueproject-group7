<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex" v-if="product">
      <img class="max-w-lg" :src="product.images?.[0]" alt="product" v-if="product.images?.length" />
      <div class="product-details ml-4 relative">
        <h1 class="product-h1">{{ product.title }}</h1>
        <p class="product-p max-w-xs">{{ product.description }}</p>
        <div class="absolute bottom-0 right-0 flex flex-col items-end">
          <p class="product-price text-lg">${{ product.price }}</p>
          <button class="bg-neutral-800 text-white py-2 px-4 mt-2 rounded hover:bg-stone-600">Add to cart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { apiService } from '@/api/apiService.js';

const product = ref(null);
const route = useRoute();

onMounted(async () => {
  try {
    const id = route.params.id;
    product.value = await apiService.getProductById(id);
  } catch (error) {
    console.error('Error fetching product:', error);
  }
});
</script>
