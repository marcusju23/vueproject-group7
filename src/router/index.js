import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import ProductDetail from '@/views/ProductDetail.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/product/:id', component: ProductDetail }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
