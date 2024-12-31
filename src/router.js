import { createMemoryHistory, createRouter } from 'vue-router'

import Hero from './components/view/Hero.vue'
import Kategori from './components/view/Kategori.vue'
import List from './components/view/List.vue'

const routes = [
  { path: '/', component: Hero },
  { path: '/kategori', component: Kategori },
  { path: '/list', component: List },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;