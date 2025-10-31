import { createRouter, createWebHistory } from 'vue-router'
import ListadoView from '../views/ListadoView.vue'
import AltaView from '../views/AltaView.vue'
import EdicionView from '../views/EdicionView.vue'

const routes = [
  {
    path: '/',
    redirect: '/clientes'
  },
  {
    path: '/clientes',
    name: 'listado',
    component: ListadoView,
    meta: { title: 'Listado de Clientes' }
  },
  {
    path: '/clientes/nuevo',
    name: 'alta',
    component: AltaView,
    meta: { title: 'Nuevo Cliente' }
  },
  {
    path: '/clientes/editar/:id',
    name: 'edicion',
    component: EdicionView,
    props: true,
    meta: { title: 'Editar Cliente' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Cambiar título de la página según la ruta
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Gestión de Clientes'
  next()
})

export default router
