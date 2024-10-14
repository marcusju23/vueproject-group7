<template>
  <div class="max-w-full px-4">
    <div class="mt-8" v-for="(productsInCategory, category) in categoryProducts" :key="category">
      <h3 class="category-title text-2xl">{{ category }}</h3>
      <div class="flex flex-wrap">
        <ProductCard v-for="(product, index) in productsInCategory" :key="index" :product="product" />
      </div>
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

const categoryProducts = ref({});

onMounted(async () => {
  const data = await apiService.getProducts();
  products.value = data;
  categoryProducts.value = groupProductsByCategory(products.value);
});

const groupProductsByCategory = (products) => {
  return products.reduce((grouped, product) => {
    const categoryName = product.category;
    if (!grouped[categoryName]) {
      grouped[categoryName] = [];
    }
    grouped[categoryName].push(product);
    return grouped;
  }, {});
};

const filteredProducts = computed(() => {
  return products.value.filter(product =>
      product.title.toLowerCase().includes(props.searchQuery.toLowerCase())
  );
});
</script>
