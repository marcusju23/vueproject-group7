<template>
  <div>
    <Navbar @updateSearchQuery="updateSearchQuery"/>

    <router-view :searchQuery="searchQuery"/>
  </div>
  <Footer/>
</template>

<script setup>
import {ref} from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue'

const searchQuery = ref('');

function updateSearchQuery(query) {
  searchQuery.value = query;
}
</script>
