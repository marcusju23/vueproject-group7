<template>
  <div class="product-list">
    <ProductCard v-for="product in products" :key="product.id" :product="product"/>
  </div>
</template>

<script>
import { apiService } from '@/api/apiService.js';
import ProductCard from '@/components/ProductCard.vue';

export default {
  components: { ProductCard },
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    this.products = await apiService.getProducts();
  }
};
</script>

<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
}
</style>


<!--Detta är vart vi hämntar produkter från APIn, sidan laddas och visar dem med Productcard filen-->