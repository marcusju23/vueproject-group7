const API_URL = 'https://fakestoreapi.com';

export const apiService = {
    async getProducts() {
        const response = await fetch(`${API_URL}/products`);
        return await response.json();
    },
    async getProductById(id) {
        const response = await fetch(`${API_URL}/products/${id}`);
        return await response.json();
    },
};
