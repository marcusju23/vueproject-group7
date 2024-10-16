<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-center text-3xl font-bold mb-10">Explore Our Collection</h1>

    <div v-for="(productsInCategory, category) in categoryProducts" :key="category" class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">{{ category }}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
            v-for="product in productsInCategory"
            :key="product.id"
            class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col justify-between"
        >
          <div class="relative overflow-hidden">
            <img
                :src="product.image"
                alt="Product image"
                class="w-full h-48 object-contain mb-4 transition-transform duration-300 ease-in-out transform hover:scale-110"
            />
            <div class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold rounded-full p-2">
              ${{ product.price }}
            </div>
          </div>
          <h3 class="text-lg font-semibold mb-2">{{ product.title }}</h3>
          <p class="text-gray-600 mb-4 flex-grow">{{ product.description.substring(0, 120) }}...</p>
          <button
              @click="goToProduct(product.id)"
              class="bg-blue-500 text-white px-4 py-2 mt-auto rounded-lg hover:bg-blue-600 transition-colors duration-300 w-full"
          >
            View Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/api/apiService';

const products = ref([]);
const categoryProducts = ref({});
const router = useRouter();

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

const goToProduct = (productId) => {
  router.push(`/product/${productId}`);
};
</script>

