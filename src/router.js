import { createWebHistory , createRouter } from 'vue-router'

import Hero from './components/view/Hero.vue'
import Kategori from './components/view/Kategori.vue'
import List from './components/view/List.vue'
import KategoriPage from './components/view/KategoriPage.vue'

const routes = [
  { path: '/', component: Hero },
  { path: '/kategori', component: Kategori },
  { path: '/kategori/:id', component: KategoriPage },
  { path: '/list', component: List },
  { path: '/detail', component: List },
]

const router = createRouter({
  history: createWebHistory (),
  routes,
})

export default router;