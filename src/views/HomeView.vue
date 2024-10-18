<template>
  <div class="flex flex-col min-h-screen">
    <div class="container mx-auto px-4 py-8 flex-grow">
      <h1 class="text-center text-5xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-wide uppercase">
        Explore Our Collection
      </h1>

      <div class="flex justify-center mb-8 space-x-4">
        <button
            v-for="category in categoryNames"
            :key="category"
            @click="filterByCategory(category)"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {{ category }}
        </button>
        <button
            @click="clearFilter"
            class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          Show All
        </button>
      </div>

      <div v-for="(productsInCategory, category) in filteredCategoryProducts" :key="category" class="mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 capitalize">
          {{ category }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard v-for="(product, index) in productsInCategory" :key="index" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import { apiService } from '@/api/apiService';

const products = ref([]);
const categoryProducts = ref({});
const selectedCategory = ref('');
const router = useRouter();

onMounted(async () => {
  const data = await apiService.getProducts();
  products.value = data;
  categoryProducts.value = groupProductsByCategory(products.value);
});

const categoryNames = computed(() => {
  return Object.keys(categoryProducts.value);
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

const filteredCategoryProducts = computed(() => {
  if (!selectedCategory.value) return categoryProducts.value; // If no category is selected, show all
  const filteredProducts = {};
  filteredProducts[selectedCategory.value] = categoryProducts.value[selectedCategory.value] || [];
  return filteredProducts;
});

const filterByCategory = (category) => {
  selectedCategory.value = category;
};
const clearFilter = () => {
  selectedCategory.value = '';
};

const goToProduct = (productId) => {
  router.push(`/product/${productId}`);
};
</script>
