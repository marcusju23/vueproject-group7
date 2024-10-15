const API_URL = 'http://localhost:4000/api';
const ORDER_URL = 'http://localhost:4000/api/orders';

export const apiService = {
    async getProducts() {
        const response = await fetch(`${API_URL}/products`);
        return await response.json();
    },
    async getProductById(id) {
        const response = await fetch(`${API_URL}/products/${id}`);
        return await response.json();
    },
    
    async createOrder(orderData) {
        const response = await fetch(ORDER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        return await response.json();
    },

    async updateOrder(id, orderData) {
        const response = await fetch(`${ORDER_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        return await response.json();
    },

    async cancelOrder(id) {
        const response = await fetch(`${ORDER_URL}/${id}/cancel`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' }
        });
        return await response.json();
    },
};

