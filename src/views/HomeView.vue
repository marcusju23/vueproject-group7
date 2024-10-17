<template>
  <div class="flex flex-col min-h-screen">
    <div class="container mx-auto px-4 py-8 flex-grow">
      <h1 class="text-center text-5xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 tracking-wide uppercase">
        Explore Our Collection
      </h1>

      <div class="flex justify-center mb-8">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Filter Products..."
            class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div v-for="(productsInCategory, category) in filteredCategoryProducts" :key="category" class="mb-16">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 capitalize">
          {{ category }}
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
              v-for="product in productsInCategory"
              :key="product.id"
              class="bg-white rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out flex flex-col justify-between p-6"
          >
            <div class="relative overflow-hidden rounded-t-lg">
              <img
                  :src="product.image"
                  alt="Product image"
                  class="w-full h-56 object-contain mb-4 transform transition-transform duration-300 ease-in-out hover:scale-105"
              />
              <div class="absolute top-2 right-2 bg-gradient-to-r from-green-400 to-green-600 text-white text-sm font-bold rounded-full p-2 shadow-lg">
                ${{ product.price }}
              </div>
            </div>

            <div class="flex-grow">
              <h3 class="text-xl font-semibold text-gray-800 mb-2 leading-snug">
                {{ product.title }}
              </h3>
              <p class="text-gray-600 mb-4 text-sm leading-relaxed">
                {{ product.description.substring(0, 120) }}...
              </p>
            </div>

            <button
                @click="goToProduct(product.id)"
                class="bg-blue-500 text-white py-2 px-4 mt-auto rounded-lg hover:bg-blue-600 transition-colors duration-300 ease-in-out w-full"
            >
              View Product
            </button>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-neutral-800 mt-8">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm text-white sm:text-center">
          <img class="inline w-6 h-6 mx-2" src="@/components/icons/github-mark-white.png" alt="GitHub Icon" />
          <a href="https://github.com/marcusju23/vueproject-group7" class="hover:underline">vueproject-group7</a>
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
          <RouterLink to="/about">
            <p class="hover:underline me-4 md:me-6">About</p>
          </RouterLink>
          <RouterLink to="/contact">
            <p class="hover:underline">Contact</p>
          </RouterLink>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/api/apiService';

const products = ref([]);
const categoryProducts = ref({});
const searchQuery = ref('');
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
const filteredCategoryProducts = computed(() => {
  if (!searchQuery.value) return categoryProducts.value;

  const query = searchQuery.value.toLowerCase();
  const filteredProducts = {};

  for (const category in categoryProducts.value) {
    filteredProducts[category] = categoryProducts.value[category].filter((product) =>
        product.title.toLowerCase().includes(query)
    );
  }

  return filteredProducts;
});

const goToProduct = (productId) => {
  router.push(`/product/${productId}`);
};
</script>
