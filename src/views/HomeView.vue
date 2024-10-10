<template>
  <div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import {apiService} from '@/api/apiService';

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
});

const products = ref([]);

onMounted(async () => {
  const data = await apiService.getProducts();
  products.value = data;
});

const filteredProducts = computed(() => {
  return products.value.filter(product =>
      product.title.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});
</script>
