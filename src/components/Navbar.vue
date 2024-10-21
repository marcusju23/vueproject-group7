<template>
  <nav class="z-50 sticky top-0 flex justify-between items-center p-4 backdrop-blur-md bg-black/25 text-white">
    <div class="flex items-center space-x-4">
      <ul class="flex space-x-4">
        <RouterLink active-class="active" to="/"><img class="max-h-7" src="@/components/icons/home-icon.png" alt="Home"></RouterLink>
        <li class="relative">
          <button @click="toggleDropdown" class="hover:text-gray-300 focus:outline-none">
            <img class="max-h-7" src="@/components/icons/hamburger.png" alt="Menu">
          </button>
          <ul v-if="isDropdownOpen" class="absolute left-0 mt-2 bg-neutral-800 text-white shadow-lg">
            <li>
              <RouterLink @click="toggleDropdown" to="/about" class="menu-item">About</RouterLink>
            </li>
            <li>
              <RouterLink @click="toggleDropdown" to="/contact" class="menu-item">Contact</RouterLink>
            </li>
          </ul>
        </li>
      </ul>

      <div class="relative">
        <input v-model="searchQuery" @input="emitSearchQuery" type="text" placeholder="Search for products..."
               class="w-96 px-4 py-2 rounded-lg backdrop-blur-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none
            focus:ring focus:ring-green-500"/>
        <ul v-if="filteredResults.length > 0"
            class="absolute mt-2 w-96 bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
          <li v-for="product in filteredResults" :key="product.id" @click="goToProduct(product.id)"
              class="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 text-black">
            <img :src="product.image" alt="Product" class="w-12 h-12 object-cover mr-4 rounded" />
            <div class="flex-1">
              <p class="text-gray-900">{{ product.title }}</p>
              <p class="text-gray-600 text-sm">${{ product.price }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex items-right cart-container">
      <div class="relative">
        <button @click="toggleCart" class="hover:text-gray-300 focus:outline-none cart-btn">
          <img class="max-h-9" src="@/components/icons/shopping-cart.png" alt="Cart">
          <span v-if="cartStore.cartItemCount()" class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-center">
            {{ cartStore.cartItemCount() }}
          </span>
        </button>

        <div v-if="isCartOpen" class="z-50 absolute right-[-45%] top-14 w-[400px] text-white backdrop-blur-lg bg-black/30">
          <div class="max-h-[300px] overflow-y-auto"> <!-- Set max height and enable scrolling -->
            <ul v-for="(cartProduct, index) in cartStore.products" :key="index">
              <li>
                <div class="flex items-center">
                  <img class="p-4 max-h-24" :src="cartProduct.image" :alt="cartProduct.title">
                  <div class="p-4 grow">
                    <p class="text-xl">{{ cartProduct.title }}</p>
                    <p class="text-xl bold">${{ cartProduct.price }}</p>
                    <p>Quantity: {{ cartProduct.quantity }}</p>
                  </div>
                  <button @click="cartStore.deleteFromCart(index)" class="text-white bg-black/30 p-2 m-2 rounded">X</button>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex justify-center content-center flex-col">
            <p class="text-white p-4 text-2xl">Total Price : ${{ totalCartPrice }}</p>
            <div>
              <button class="text-white w-100 p-4 backdrop-blur-md bg-black/30">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { apiService } from '@/api/apiService';
import { cartStore } from '@/store/store.js';

const searchQuery = ref('');
const isDropdownOpen = ref(false);
const isCartOpen = ref(false);
const products = ref([]);
const router = useRouter();

const totalCartPrice = computed(() => {
  const sumOfProducts = cartStore.products.reduce((total, product) => total + product.price * product.quantity, 0);
  return sumOfProducts.toFixed(2);
});

onMounted(async () => {
  try {
    const data = await apiService.getProducts();
    products.value = data;
  } catch (error) {
    console.error('Error loading products:', error);
  }
});

const filteredResults = computed(() => {
  if (!searchQuery.value) return [];
  const query = searchQuery.value.toLowerCase().trim();
  return products.value.filter(product => product.title.toLowerCase().trim().includes(query));
});

function goToProduct(id) {
  searchQuery.value = '';
  isDropdownOpen.value = false;
  router.push(`/product/${id}`);
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function toggleCart() {
  isCartOpen.value = !isCartOpen.value;
}
</script>
