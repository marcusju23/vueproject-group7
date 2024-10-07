<template>
  <div v-if="product">
    <h1>{{ product.title }}</h1>
    <img :src="product.images[0]" alt="product image"/>
    <p>{{ product.description }}</p>
    <p>{{ product.price }} $</p>
  </div>
</template>

<script>
import { apiService } from '@/api/apiService.js';

export default {
  data() {
    return {
      product: null
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    this.product = await apiService.getProductById(id);
  }
};
</script>

<!--sida som visart detaljerna för varje produkt när användaren klickar på "View details"-->