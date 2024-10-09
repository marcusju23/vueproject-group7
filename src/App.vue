<template>
  <main>
    <Navbar></Navbar>
    <RouterView />
    <Footer></Footer>
  </main>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import {RouterView} from 'vue-router';
import Footer from "@/components/Footer.vue";
</script>