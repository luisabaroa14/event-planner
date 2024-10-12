import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import EventsView from '@/views/EventsView.vue'
import ChefsView from '@/views/ChefsView.vue'
import AdminView from '@/views/AdminView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import CartView from '@/views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { adminOnly: false }
    },
    {
      path: '/events',
      name: 'events',
      component: EventsView,
      meta: { adminOnly: false }
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsView,
      meta: { adminOnly: false }
    },
    {
      path: '/chefs',
      name: 'chefs',
      component: ChefsView,
      meta: { adminOnly: false }
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView,
      meta: { adminOnly: false }
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { adminOnly: true }
    },
    {
      path: '/not-found',
      name: 'not-found',
      component: NotFoundView,
      meta: { adminOnly: true }
    },
    // Catch-all route for any other routes that are not found
    {
      path: '/:catchAll(.*)',
      redirect: '/not-found'
    }
  ]
})

export default router
