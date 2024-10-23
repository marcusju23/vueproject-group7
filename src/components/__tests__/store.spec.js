import { cartStore } from '@/store/store';
import { describe, it, expect, beforeEach } from 'vitest';

const createMockProduct = (id, title, price) => ({ id, title, price });

describe('store.js', () => {
    beforeEach(() => {
        cartStore.products = [
            createMockProduct(1, 'Product 1', 19.99),
            createMockProduct(2, 'Product 2', 29.99),
            createMockProduct(3, 'Product 3', 39.99),
        ];
    });

    it('should add a product to the cart', () => {
        const newProduct = createMockProduct(4, 'Product 4', 49.99);
        cartStore.addToCart(newProduct);

        expect(cartStore.products.length).toBe(4);
        expect(cartStore.products[3]).toEqual(newProduct);
    });

    it('should add two products to the cart', () => {
        const product1 = createMockProduct(4, 'Product 4', 49.99);
        const product2 = createMockProduct(5, 'Product 5', 59.99);
        cartStore.addToCart(product1);
        cartStore.addToCart(product2);

        expect(cartStore.products.length).toBe(5);
        expect(cartStore.products.slice(3)).toEqual([product1, product2]);
    });

    it('should delete a product from the cart by index', () => {
        cartStore.deleteFromCart(0);

        expect(cartStore.products.length).toBe(2);
        expect(cartStore.products[0]).toEqual(createMockProduct(2, 'Product 2', 29.99));
    });

    it('should not remove a product if the index is out of bounds', () => {
        cartStore.deleteFromCart(10);

        expect(cartStore.products.length).toBe(3);
    });
});
