<template>
  <div class="grid">
    <div class="content mt-16 flex items-center justify-center">
      <div class="flex" v-if="product">
        <div>
          <img class="max-w-sm mb-32" :src="product.image" alt="product"/>
        </div>
        <div class="relative ml-6 flex-1 flex flex-col">
          <h1 class="product-title mb-2">{{ product.title }}</h1>
          <p class="product-rating text-blue-700 mb-2">{{ product.rating?.rate }} / 5 ({{ product.rating?.count }}
            reviews)</p>
          <p class="product-description mb-4">{{ product.description }}</p>
          <div class="mt-auto text-right">
            <p class="product-price text-xl text-right">${{ product.price }}</p>
            <button
                @click="addProductToCart()"
                class="add-to-cart-btn p-2 rounded transition-all duration-300 ease-in-out text-white"
                :class="addedToCart ? 'bg-green-500' : 'bg-blue-500'"
                :disabled="addedToCart"
            >
              {{ addedToCart ? '✔ Added' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="error">
        <p>Product not found!</p>
      </div>

      <div v-else>
        Loading product details...
      </div>
    </div>
  </div>

  <div class="flex pt-10">
    <div class="max-w-full px-4">
      <h3 class="text-2xl" v-if="product">
        Related products to <span class="capitalize font-semibold">{{ product.category }}</span>
      </h3>
      <div v-else>Loading...</div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard v-for="(relatedProduct, index) in relatedProducts" :key="index" :product="relatedProduct"/>
      </div>
    </div>
  </div>

  <div class="flex pt-10">
    <div class="max-w-full px-4">
      <h3 class="text-2xl">Other products</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard v-for="(otherProduct, index) in otherProducts" :key="index" :product="otherProduct"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch} from 'vue';
import {useRoute} from 'vue-router';
import {apiService} from '@/api/apiService.js';
import {cartStore} from '@/store/store.js';
import ProductCard from "@/components/ProductCard.vue";

const props = defineProps({
  searchQuery: {
    type: String,
    default: '',
  }
});

const route = useRoute();
const product = ref(null);
const error = ref(false);
const addedToCart = ref(false);
const relatedProducts = ref([]);
const otherProducts = ref([]);

function addProductToCart() {
  if (product.value) {
    cartStore.addToCart(product.value);
    addedToCart.value = true;
    setTimeout(() => {
      addedToCart.value = false;
    }, 1500);
  }
}

onMounted(() => {
  fetchProduct(route.params.id);
});

watch(() => route.params.id, (newId) => {
  fetchProduct(newId);
});

async function fetchProduct(productId) {
  try {
    const data = await apiService.getProductById(productId);
    if (data) {
      product.value = data;
      error.value = false;
      await fetchRelatedProducts(data);
      await fetchOtherProducts(data);
    } else {
      error.value = true;
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    error.value = true;
  }
}

async function fetchRelatedProducts(currentProduct) {
  try {
    const products = await apiService.getProducts();
    relatedProducts.value = products.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);
  } catch (error) {
    console.error('Error fetching related products:', error);
  }
}

async function fetchOtherProducts(currentProduct) {
  try {
    const products = await apiService.getProducts();
    const filteredProducts = products.filter(
        p => p.category !== currentProduct.category && p.id !== currentProduct.id
    );
    otherProducts.value = shuffleArray(filteredProducts);
  } catch (error) {
    console.error('Error fetching other products:', error);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
</script>
