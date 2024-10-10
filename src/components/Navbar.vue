<template>
  <nav class="flex justify-between items-center p-4 bg-neutral-800 text-white">
    <div class="flex items-center space-x-4">
      <ul class="flex space-x-4">
        <li class="relative">
          <button @click="toggleDropdown" class="hover:text-gray-300 focus:outline-none">Menu</button>
          <ul v-if="isDropdownOpen" class="absolute left-0 mt-2 bg-neutral-800 text-white shadow-lg">
            <li><RouterLink active-class="active" to="/" class="menu-item">Home</RouterLink></li>
            <li><RouterLink active-class="active" to="/contact" class="menu-item">Contact</RouterLink></li>
            <li><RouterLink active-class="active" to="/about" class="menu-item">About</RouterLink></li>
          </ul>
        </li>
      </ul>

      <div class="relative">
        <input
            v-model="searchQuery"
            @input="emitSearchQuery"
            type="text"
            placeholder="Search for products..."
            class="w-64 px-4 py-2 rounded-lg bg-neutral-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-green-500"
        />
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';

const searchQuery = ref('');
const isDropdownOpen = ref(false);
const emit = defineEmits(['updateSearchQuery']);

function emitSearchQuery() {
  emit('updateSearchQuery', searchQuery.value);
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}
</script>
