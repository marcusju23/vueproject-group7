<template>
  <nav class="flex justify-between items-center p-4 bg-neutral-800 text-white">
    <div class="flex items-center space-x-4">

      <ul class="flex space-x-4">
        <li class="relative">
          <button @click="toggleDropdown" class="hover:text-gray-300 focus:outline-none">Menu</button>
          <ul v-if="isDropdownOpen" class="absolute left-0 mt-2 bg-neutral-800 text-white shadow-lg">
            <li>
              <RouterLink active-class="active" to="/" class="menu-item">Home</RouterLink>
            </li>
            <li>
              <RouterLink active-class="active" to="/about" class="menu-item">Contact</RouterLink>
            </li>
            <li>
              <RouterLink active-class="active" to="/contact" class="menu-item">About</RouterLink>
            </li>
          </ul>
        </li>
      </ul>

      <div class="relative">
        <input
            v-model="searchQuery"
            @input="emitSearchQuery"
            type="text"
            placeholder="Search for products..."
            class="w-96 px-4 py-2 rounded-lg bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
        />


        <ul v-if="filteredResults.length > 0"
            class="absolute mt-2 w-96 bg-white rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
          <li
              v-for="product in filteredResults"
              :key="product.id"
              @click="goToProduct(product.id)"
              class="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-100 text-black"
          >
            <img :src="product.image" alt="Product image" class="w-12 h-12 object-cover mr-4 rounded" />
            <div class="flex-1">
              <p class="text-gray-900">{{ product.title }}</p>
              <p class="text-gray-600 text-sm">${{ product.price }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import {useRouter} from 'vue-router';
import {apiService} from '@/api/apiService';

const searchQuery = ref('');
const isDropdownOpen = ref(false);
const router = useRouter();

const products = ref([]);


onMounted(async () => {
  try {
    const data = await apiService.getProducts();
    products.value = data;
    console.log('Loaded Products:', products.value);
  } catch (error) {
    console.error('Error loading products:', error);
  }
});


const filteredResults = computed(() => {
  if (!searchQuery.value) return [];

  const query = searchQuery.value.toLowerCase().trim();

  return products.value.filter(product => {
    const title = product.title.toLowerCase().trim();
    return title.includes(query);
  });
});


function goToProduct(id) {
  searchQuery.value = '';
  isDropdownOpen.value = false;
  router.push(`/product/${id}`);
}


function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  const dropdownButton = document.querySelector('button');
  const dropdownMenu = document.querySelector('ul.absolute');
  if (!dropdownButton.contains(event.target) && dropdownMenu && !dropdownMenu.contains(event.target)) {
    isDropdownOpen.value = false;
  }
});
</script>
