import { createRouter, createWebHistory } from 'vue-router'
import ClientesView from '../views/ClientesView.vue'

const routes = [
  {
    path: '/',
    name: 'clientes',
    component: ClientesView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
