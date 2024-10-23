import { mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import ProductCard from '@/components/ProductCard.vue';
import { describe, expect, it, beforeEach } from 'vitest';

const createRouterMock = () => {
    return createRouter({
        history: createWebHistory(),
        routes: [
            { path: '/', component: { template: '<div>Home</div>' } },
            { path: '/product/:id', component: { template: '<div>Product Detail</div>' } },
        ],
    });
};

describe('ProductCard.vue', () => {
    let router;
    let wrapper;
    const product = {
        id: 1,
        title: 'Test Product',
        price: 29.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
            'Nunc pharetra, turpis id efficitur facilisis.',
        image: 'product_image.jpg'
    };

    beforeEach(() => {
        router = createRouterMock();
        router.push('/');
        wrapper = mount(ProductCard, {
            global: {
                plugins: [router],
            },
            props: { product },
        });
    });

    it('renders product information correctly', async () => {
        expect(wrapper.text()).toContain('Test Product');
        expect(wrapper.text()).toContain('$29.99');
        expect(wrapper.find('p').text()).toContain('Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
            'Nunc pharetra, turpis id efficitur facilisis.');

        const img = wrapper.find('img');
        expect(img.attributes('src')).toBe('product_image.jpg');

        expect(wrapper.text()).not.toBe('');
        expect(wrapper.find('h3').text()).not.toBe('');
        expect(wrapper.find('p').text()).not.toBe('');
    });

    it('navigates to the product detail page when clicked', async () => {
        await wrapper.trigger('click');
        await router.isReady();

        expect(window.location.pathname).toBe('/product/1');
    });
});
