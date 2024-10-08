const API_URL = 'https://api.escuelajs.co/api/v1/products';

export const apiService = {
    async getProducts() {
        const response = await fetch(`${API_URL}`);
        return await response.json();
    },
    async getProductById(id) {
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    }
};
