import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ContactView from "@/views/ContactView.vue";
import AboutView from "@/views/AboutView.vue";
import NotFoundView from '@/views/NotFoundView.vue'
import ProductDetailView from "@/views/ProductDetailView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView
        },
        {
            path: "/contact",
            name: "Contact",
            component: ContactView
        },
        {
            path: "/about",
            name: "About",
            component: AboutView
        },
        {
            path: "/product/:id",
            name: "ProductDetail",
            component: ProductDetailView
        },
        {
            path: "/:pathMatch(.*)*",
            name: "NotFound",
            component: NotFoundView
        }
    ]
})

export default router
