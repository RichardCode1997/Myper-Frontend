import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import UsuariosView from '../views/UsuariosView.vue'
import ConstruccionView from '../views/ConstruccionView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginView, meta: { public: true } },
  { path: '/home', name: 'Home', component: HomeView, meta: { requiresAuth: true } },
  { path: '/usuarios', name: 'Usuarios', component: UsuariosView, meta: { requiresAuth: true } },
  { path: '/construccion', name: 'Construccion', component: ConstruccionView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Vue Router 5 — usar return en lugar de next()
router.beforeEach((to) => {
  const isAuthenticated = localStorage.getItem('myper_user')
  if (to.meta.requiresAuth && !isAuthenticated) return '/login'
  if (to.path === '/login' && isAuthenticated) return '/home'
  return true
})

export default router
