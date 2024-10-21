import { reactive, watch } from 'vue';

export const cartStore = reactive({
  products: [],

  addToCart(newProduct) {
    const existingProduct = this.products.find(p => p.id === newProduct.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      newProduct.quantity = 1;
      this.products.push(newProduct);
    }
  },

  deleteFromCart(productID){
    const updatedList = [...this.products];
    updatedList.splice(productID, 1);
    this.products = updatedList;
  },

  cartItemCount() {
    return this.products.reduce((count, product) => count + product.quantity, 0);
  }
});

watch(
    () => cartStore.products,
    (newProducts) => {
      localStorage.setItem("addedToCart", JSON.stringify(newProducts));
    },
    { deep: true }
);
