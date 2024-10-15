<template>
  <div>
    <Navbar @updateSearchQuery="updateSearchQuery"/>
    <router-view :searchQuery="searchQuery"/>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import Navbar from '@/components/Navbar.vue';

const searchQuery = ref('');

function updateSearchQuery(query) {
  searchQuery.value = query;
}
</script>
