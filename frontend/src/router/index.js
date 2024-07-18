import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import EventsView from '@/views/EventsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

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
