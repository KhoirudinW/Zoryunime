import { createWebHistory , createRouter } from 'vue-router'

import Hero from './components/view/Hero.vue'
import Kategori from './components/view/Kategori.vue'
import KategoriPage from './components/view/KategoriPage.vue'
import KategoriMusim from './components/view/KategoriMusim.vue'
import KategoriPageMusim from './components/view/KategoriPageMusim.vue'
import Detail from './components/view/DetailedAnime.vue'
import Search from './components/view/Search.vue'

const routes = [
  { path: '/', component: Hero },
  { path: '/kategori/top', component: KategoriPage },
  { path: '/kategori/genre', component: Kategori },
  { path: '/kategori/genre/:id', component: KategoriPage },
  { path: '/kategori/season', component: KategoriMusim },
  { path: '/kategori/season/:year', component: KategoriPageMusim },
  { path: '/kategori/season/:year/:season', component: KategoriPageMusim },
  { path: '/Search', component: Search },
  { path: '/anime/:id', component: Detail },
]

const router = createRouter({
  history: createWebHistory (),
  routes,
})

export default router;