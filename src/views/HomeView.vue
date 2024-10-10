<template>
  <div class="container mx-auto">
    <div class="container mt-8" v-for="(productsInCategory, category) in categoryProducts" :key="category">
      <h3 class="category-title text-2xl">{{ category }}</h3>
      <div class="flex flex-wrap">
        <ProductCard v-for="(product, index) in productsInCategory" :key="index" :product="product" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue';
import { apiService } from '@/api/apiService';
import Footer from "@/components/Footer.vue";

const categoryProducts = ref({});

onMounted(async () => {
  const data = await fetchProducts();
  categoryProducts.value = groupProductsByCategory(data);
});

const fetchProducts = async () => {
  try {
    const data = await apiService.getProducts();
    if (Array.isArray(data)) {
      return data;
    } else {
      console.error("Unexpected data format:", data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const groupProductsByCategory = (products) => {
  return products.reduce((grouped, product) => {
    const categoryName = product.category;
    if (!grouped[categoryName]) {
      grouped[categoryName] = [];
    }
    grouped[categoryName].push(product);
    return grouped;
  }, {});
};
</script>
