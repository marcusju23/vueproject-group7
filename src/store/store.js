import { reactive, watch, onMounted } from 'vue';

export const cartStore = reactive({
  products: [],

  addToCart(newProduct) {
    this.products.push(newProduct);
  },

  deleteFromCart(productID){
    const updatedList = [...this.products];
    updatedList.splice(productID, 1);
    this.products = updatedList;
  }

});

watch(
  () => cartStore.products,
  (newProducts) => {
    localStorage.setItem("addedToCart", JSON.stringify(newProducts));
  },
  { deep: true }
);


