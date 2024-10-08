<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
    <img :src="product.images?.[0]" alt="product image" v-if="product.images?.length" />
    <p>{{ product.description }}</p>
    <p>{{ product.price }} $</p>
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
