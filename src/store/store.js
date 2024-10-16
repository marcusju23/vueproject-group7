import { reactive, watch, onMounted } from 'vue';

export const cartStore = reactive({
  products: [],

  addToCart(newProduct) {
    this.products.push(newProduct);
  }
});

watch(
  () => cartStore.products,
  (newProducts) => {
    localStorage.setItem("addedToCart", JSON.stringify(newProducts));
  },
  { deep: true }
);
