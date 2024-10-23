import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '@/App.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/about', component: { template: '<div>About</div>' } },
    { path: '/contact', component: { template: '<div>Contact</div>' } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

describe('App.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(App, {
            global: {
                plugins: [router]
            },
        });
    })

    it('renders Navbar and Footer components', () => {
        expect(wrapper.findComponent(Navbar).exists()).toBe(true);
        expect(wrapper.findComponent(Footer).exists()).toBe(true);
    });

    it('updates searchQuery when Navbar emits updateSearchQuery event', async () => {
        const navbar = wrapper.findComponent(Navbar);
        const query = 'testing hello';

        await navbar.vm.$emit('updateSearchQuery', query);

        expect(wrapper.vm.searchQuery).toBe(query);
    });
});
