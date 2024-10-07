<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
    <img :src="product.images[0]" alt="product image"/>
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
  const id = route.params.id;
  product.value = await apiService.getProductById(id);
});
</script>
