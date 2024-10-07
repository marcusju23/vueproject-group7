<template>
  <div class="product-card">
    <img :src="product.images[0]" alt="product image" class="product-image"/>
    <h3>{{ product.title }}</h3>
    <p>{{ product.price }} $</p>
    <router-link :to="`/product/${product.id}`">View Details</router-link>
  </div>
</template>

<script>
export default {
  props: ['product']
};
</script>

<style>
.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  text-align: center;
}
.product-image {
  max-width: 100%;
  height: auto;
}
</style>


<!--// Compnent som ska visa varje p roduket med bild, titel och pris och länk till produktens detaljer-->

