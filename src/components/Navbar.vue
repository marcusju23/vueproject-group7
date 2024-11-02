<template>
  <nav
      class="z-50 sticky top-0 flex flex-wrap justify-between items-center p-4 backdrop-blur-md bg-black/25 text-white">
    <div class="flex items-center space-x-4">
      <ul class="flex space-x-4">
        <RouterLink active-class="active" to="/"><img class="max-h-7" src="@/components/icons/home-icon.png" alt="Home">
        </RouterLink>
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

      <div class="relative w-full sm:w-80 md:w-96">
        <input v-model="searchQuery" @input="emitSearchQuery" type="text" placeholder="Search for products..."
               class="w-full px-4 py-2 rounded-lg backdrop-blur-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
        />
        <ul v-if="filteredResults.length > 0"
            class="absolute mt-2 w-full max-w-[90vw] sm:w-96 bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
          <li v-for="product in filteredResults" :key="product.id" @click="goToProduct(product.id)"
              class="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 text-black">
            <img :src="product.image" alt="Product" class="w-12 h-12 object-cover mr-4 rounded"/>
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
        <button @click="toggleCart" class="hover:text-gray-300 focus:outline-none cart-btn" ref="cartButton">
          <img class="max-h-9" src="@/components/icons/shopping-cart.png" alt="Cart">
          <span v-if="cartStore.cartItemCount()"
                class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 text-center">
            {{ cartStore.cartItemCount() }}
          </span>
        </button>

        <div v-if="isCartOpen" ref="cartDropdown"
             class="z-50 sm:absolute sm:right-0 sm:top-14 sm:w-[400px] sm:bg-gray-900 sm:rounded-lg
            fixed left-0 top-[calc(100%+8px)] w-full bg-gray-900 text-white rounded-b-lg shadow-lg p-4 sm:p-0 sm:inset-auto">
          <div class="w-full max-w-md sm:max-w-none">
            <div class="flex justify-between items-center bg-gray-800 p-4 rounded-t-lg sm:rounded-none">
              <h2 class="text-lg font-semibold">Shopping Cart</h2>
              <button @click="isCartOpen = false" class="text-gray-400 hover:text-gray-200 transition-colors rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>

            </div>
            <div class="overflow-y-auto max-h-[60vh] sm:max-h-[300px] p-4">
              <ul v-for="(cartProduct, index) in cartStore.products" :key="index">
                <li class="flex items-center bg-gray-800 p-4 rounded-lg mb-3">
                  <img class="w-16 h-16 object-cover rounded-lg mr-4" :src="cartProduct.image" :alt="cartProduct.title">
                  <div class="flex-grow">
                    <p class="text-sm font-semibold">{{ cartProduct.title }}</p>
                    <p class="text-sm">${{ cartProduct.price }}</p>
                    <p class="text-sm">Quantity: {{ cartProduct.quantity }}</p>
                  </div>
                  <button @click="removeItem(index, $event)" class="text-gray-500 hover:text-white ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </li>
              </ul>
              <p v-if="cartStore.products.length === 0" class="text-center text-gray-500">Your cart is empty</p>
            </div>
            <div class="p-4 bg-gray-800 rounded-b-lg sm:rounded-none">
              <p class="text-lg font-bold text-center mb-4">Total Price: ${{ totalCartPrice }}</p>
              <button class="w-full py-3 bg-green-600 rounded-lg hover:bg-green-700">
                Checkout
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>

<script setup>
import {ref, computed, onMounted, watch, onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router';
import {apiService} from '@/api/apiService';
import {cartStore} from '@/store/store.js';

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

  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

function handleClickOutside(event) {
  const cartDropdown = document.querySelector('.cart-container .z-50');
  const cartButton = document.querySelector('.cart-btn');

  if (
      cartDropdown && !cartDropdown.contains(event.target) &&
      cartButton && !cartButton.contains(event.target) &&
      !event.target.closest('.cart-container')
  ) {
    isCartOpen.value = false;
  }
}

watch(() => router.currentRoute.value, () => {
  isCartOpen.value = false;
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

function removeItem(index, event) {
  event.stopPropagation();
  cartStore.deleteFromCart(index);
}

document.addEventListener('click', (event) => {
  const dropdownButton = document.querySelector('button');
  const dropdownMenu = document.querySelector('ul.absolute');
  if (!dropdownButton.contains(event.target) && dropdownMenu && !dropdownMenu.contains(event.target)) {
    isDropdownOpen.value = false;
  }
});
</script>
