<template>
  <nav>
    <ul class="flex space-x-4 p-4 bg-neutral-800 text-white">
      <li class="relative">
        <button @click="toggleDropdown">Menu</button>
        <ul v-if="isDropdownOpen" class="absolute left-0 mt-2 bg-neutral-800 text-white shadow-lg">
          <li><RouterLink active-class="active" to="/" class="menu-item">Home</RouterLink></li>
          <li><RouterLink active-class="active" to="/contact" class="menu-item">Contact</RouterLink></li>
          <li><RouterLink active-class="active" to="/about" class="menu-item">About</RouterLink></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import {ref} from 'vue';

const isDropdownOpen = ref(false);

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
