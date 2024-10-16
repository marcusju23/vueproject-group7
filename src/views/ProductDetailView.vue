<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex" v-if="product">
      <img class="max-w-xl mb-6" :src="product.image" alt="product"/>
      <div class="relative ml-6">
        <h1 class="product-title mb-2">{{ product.title }}</h1>
        <p class="product-rating text-blue-700 mb-2">{{ product.rating?.rate }} / 5 ({{ product.rating?.count }}
          reviews)</p>
        <p class="product-description mb-4">{{ product.description }}</p>
        <div class="bottom-div absolute bottom-0 w-full text-right">
          <p class="product-price text-xl text-right">${{ product.price }}</p>
          <button @click="addProductToCart()" class="add-to-cart-btn">Add to Cart</button>
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
</template>

<script setup>
import {ref, onMounted, watch, reactive, watchEffect} from 'vue';
import {useRoute} from 'vue-router';
import {apiService} from '@/api/apiService.js';
import {cartStore} from '@/store/store.js';

const route = useRoute();

const product = ref(null);

const error = ref(false);


function addProductToCart() {
    if(product.value) {
      cartStore.addToCart(product.value);
    }
  }

async function fetchProduct(productId) {
  try {
    const data = await apiService.getProductById(productId);
    if (data) {
      product.value = data;
      error.value = false;
    } else {
      error.value = true;
    }
  } catch (err) {
    console.error('Error fetching product details:', err);
    error.value = true;
  }
}

onMounted(() => {
  fetchProduct(route.params.id);
});

onMounted(() => {
  cartStore.products = JSON.parse(localStorage.getItem("addedToCart")) || [];
});


watch(() => route.params.id, (newId) => {
  fetchProduct(newId);
});

</script>
