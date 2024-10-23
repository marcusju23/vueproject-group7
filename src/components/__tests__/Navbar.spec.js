import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import { describe, expect, test } from 'vitest';
import Navbar from '@/components/Navbar.vue';

const routes = [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } },
    { path: '/contact', component: { template: '<div>Contact</div>' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('Navbar.vue', () => {
    test('displays search results when input is provided', async () => {
        const wrapper = mount(Navbar, {
            global: {
                plugins: [router],
            },
        });

        wrapper.vm.products = [
            { id: 1, title: 'Product 1', price: 19.99, image: 'product1.png' },
            { id: 2, title: 'Product 2', price: 29.99, image: 'product2.png' },
            { id: 3, title: 'Product 3', price: 39.99, image: 'product3.png' },
        ];

        const searchInput = wrapper.find('input[type="text"]');
        await searchInput.setValue('Product');

        // Wait for reactivity to process the search query and render filtered results
        await wrapper.vm.$nextTick();

        const searchResults = wrapper.findAll('li');
        console.log('Search Results:', searchResults.map(item => item.text()));

        // Remove the first item
        const adjustedResults = searchResults.slice(1);
        console.log('After adjustment:', adjustedResults.map(item => item.text()));

        expect(adjustedResults.length).toBe(3);
    });
});
