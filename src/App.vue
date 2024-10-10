<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <Footer></Footer>
  </footer>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import {RouterView} from 'vue-router';
import Footer from "@/components/Footer.vue";
</script>