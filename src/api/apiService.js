const API_URL = 'https://api.escuelajs.co/api/v1/products';

export const apiService = {
    async getProducts() { //tanken är att detta ska hämta produkter
        const response = await fetch(`${API_URL}`);
        return await response.json();
    },
    async getProductById(id) { //detta ska hämta en specifik produkt med ID
        const response = await fetch(`${API_URL}/${id}`);
        return await response.json();
    }
};
