import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import ScanView from '../pages/ScanView.vue'
import InputView from '../pages/InputView.vue'
import ListView from '../pages/ListView.vue'
import HppView from '../pages/HppView.vue'
import BiayaView from '../pages/BiayaView.vue'
import DashboardView from '../pages/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/scan', name: 'scan', component: ScanView },
    { path: '/input', name: 'input', component: InputView },
    { path: '/list', name: 'list', component: ListView },
    { path: '/hpp', name: 'hpp', component: HppView },
    { path: '/biaya', name: 'biaya', component: BiayaView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView }
  ],
})

export default router