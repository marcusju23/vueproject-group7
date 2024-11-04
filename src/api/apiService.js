const API_URL = 'http://localhost:4000/api';

export const apiService = {
    async getProducts() {
        const response = await fetch(`${API_URL}/products`);
        return await response.json();
    },
    async getProductById(id) {
        const response = await fetch(`${API_URL}/products/${id}`);
        return await response.json();
    },
    async getOrders() {
        const response = await fetch(`${API_URL}/orders`);
        return await response.json();
    },
    async getOrderById(id) {
        const response = await fetch(`${API_URL}/orders/${id}`);
        return await response.json();
    },

    async createOrder(orderData) {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        return await response.json();
    },

    async updateOrder(id, orderData) {
        const response = await fetch(`${API_URL}/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        return await response.json();
    },
    async deleteOrder(id) {
        const response = await fetch(`${API_URL}/orders/${id}`, {
          method: 'DELETE'
        });
    
        if (!response.ok) {
          throw new Error('Failed to delete order');
        }
      }
};

