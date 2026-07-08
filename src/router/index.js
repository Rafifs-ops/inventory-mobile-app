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
    { path: '/dashboard', name: 'dashboard', component: DashboardView },
    { path: '/receipt', name: 'receipt', component: () => import('../pages/ReceiptView.vue') },
    { path: '/history', name: 'history', component: () => import('../pages/SalesHistoryView.vue') },
    { path: '/about', name: 'about', component: () => import('../pages/AboutView.vue') },
    { path: '/guide', name: 'guide', component: () => import('../pages/GuideView.vue') }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Kembali ke posisi scroll sebelumnya jika user menekan tombol Back/Forward di browser
    if (savedPosition) {
      return savedPosition
    } else {
      // Selalu scroll ke paling atas (x: 0, y: 0) saat pindah halaman
      return { top: 0 }
    }
  }
})

export default router