<template>
  <div class="product-list">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script>
import { apiService } from '@/api/apiService.js'; // Ensure the correct import path
import ProductCard from '@/components/ProductCard.vue';

export default {
  components: { ProductCard },
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    try {
      const products = await apiService.getProducts();
      console.log(products); // Check if products are being fetched
      this.products = products;
    } catch (error) {
      console.error('Error fetching products:', error); // Catch and log any errors
    }
  }
}
</script>


<style>
.product-list {
  display: flex;
  flex-wrap: wrap;
}
</style>


<!--Detta är vart vi hämntar produkter från APIn, sidan laddas och visar dem med Productcard filen-->