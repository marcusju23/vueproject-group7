<template>
  <div class="checkout">
    <h1>Checkout</h1>

    <div v-if="cartItems.length > 0">
      <h2>Your Cart</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCard v-for="(item, index) in cartItems" :key="index" :product="item" />
      </div>
      <p><strong>Total Price:</strong> ${{ totalPrice }}</p>
      <button @click="submitOrder">Place Order</button>
    </div>


    <div v-if="orderSuccess">
      <h2>Order Confirmation</h2>
      <p>Your order has been placed successfully!</p>
      <p><strong>Order ID:</strong> {{ orderDetails.id }}</p>
      <p><strong>Total Price:</strong> ${{ orderDetails.totalPrice }}</p>
    </div>

    <div v-if="confirmedOrders.length > 0">
      <h2>Your Orders</h2>
      <ul>
        <li v-for="(order, index) in confirmedOrders" :key="index">
          <div class="order-details">
            <p><strong>Order ID:</strong> {{ order._id }}</p>
            <p><strong>Total Price:</strong> ${{ order.totalPrice }}</p>
            <p><strong>Items:</strong></p>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProductCard v-for="(product, idx) in order.items" :key="idx" :product="product" />
            </div>
            <button @click="cancelOrder(order._id)">Cancel Order</button>
          </div>
        </li>
      </ul>
    </div>

    <div v-else-if="orderLoaded && confirmedOrders.length === 0">
      <p>No confirmed orders found.</p>
    </div>
  </div>
</template>

<script>
import router from '@/router/index.js'
import ProductCard from '@/components/ProductCard.vue';
import { cartStore } from '@/store/store.js';
import { apiService } from '@/api/apiService.js';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      orderSuccess: false,
      orderDetails: {},
      confirmedOrders: [],
      orderLoaded: false
    };
  },
  computed: {
    cartItems() {
      return cartStore.products;
    },
    totalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    }
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async submitOrder() {
      const order = {
        items: this.cartItems,
        totalPrice: this.totalPrice,
        status: 'Pending',
        date: new Date()
      };
      try {
        const result = await apiService.createOrder(order);
        this.orderSuccess = true;
        this.orderDetails = result;
        cartStore.products = [];
        localStorage.removeItem('addedToCart');
        await this.fetchOrders();
      } catch (error) {
        console.error('Error submitting order:', error);
        alert('Failed to place order');
      }
    },
    async fetchOrders() {
      try {
        const data = await apiService.getOrders();
        console.log('Fetched orders:', data);
        this.confirmedOrders = data;
        this.orderLoaded = true;
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    },
    async cancelOrder(orderId) {
      try {
        await apiService.deleteOrder(orderId);
        this.confirmedOrders = this.confirmedOrders.filter(order => order._id !== orderId);
        alert('Order canceled successfully. Redirecting to Home Page');
        router.push({ path: '/' });
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel the order: ' + error.message);
      }
    }
  }
};
</script>