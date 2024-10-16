<template>
  <div class="grid">
    <div class="content mt-16 flex items-center justify-center">
      <div class="flex" v-if="product">
        <div>
          <img class="max-w-sm mb-6" :src="product.image" alt="product" />
        </div>
        <div class="relative ml-6 flex-1 flex flex-col">
          <h1 class="product-title mb-2">{{ product.title }}</h1>
          <p class="product-rating text-blue-700 mb-2">{{ product.rating?.rate }} / 5 ({{ product.rating?.count }} reviews)</p>
          <p class="product-description mb-4">{{ product.description }}</p>
          <div class="mt-auto text-right">
            <p class="product-price text-xl text-right">${{ product.price }}</p>
            <button class="add-to-cart-btn">Add to Cart</button>
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
      <div class="mt-8">
        <h3 class="text-2xl">Related Products</h3>
        <div class="flex flex-wrap">
          <ProductCard v-for="(relatedProduct, index) in relatedProducts" :key="index" :product="relatedProduct"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { apiService } from '@/api/apiService.js';
import ProductCard from "@/components/ProductCard.vue";

const route = useRoute();
const product = ref(null);
const error = ref(false);
const relatedProducts = ref([]);

onMounted(() => {
  fetchProduct(route.params.id);
});

watch(() => route.params.id, (newId) => {
  fetchProduct(newId);
});

const props = defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
});

async function fetchProduct(productId) {
  try {
    const data = await apiService.getProductById(productId);
    if (data) {
      product.value = data;
      error.value = false;
      await fetchRelatedProducts(data);
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
</script>
