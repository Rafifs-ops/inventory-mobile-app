<template>
    <div
        class="min-h-screen bg-white sm:bg-slate-50 text-slate-900 flex flex-col sm:items-center sm:justify-center sm:py-12">

        <div
            class="w-full sm:max-w-lg bg-white sm:rounded-2xl sm:shadow-xl sm:border sm:border-slate-200 overflow-hidden flex-grow sm:flex-grow-0 flex flex-col">

            <div class="bg-slate-900 px-6 py-10 sm:py-12 text-center border-b-4 border-blue-600">
                <h1 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    SmartPOS
                </h1>
                <p class="text-slate-400 text-sm sm:text-base mt-2.5 font-medium">
                    Sistem <i>Point of Sale</i> Terpadu
                </p>
            </div>

            <div class="p-5 sm:p-8 flex-grow bg-slate-50 sm:bg-white">
                <div class="grid grid-cols-1 gap-3.5 sm:gap-4">

                    <button v-for="(menu, index) in daftarMenu" :key="index" @click="navigasiKe(menu.path)"
                        :class="['group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:shadow-md active:bg-slate-100 transition-all text-left shadow-sm sm:shadow-none', menu.classes.hoverBorder]">
                        <div :class="['flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 rounded-xl shrink-0 group-hover:scale-105 transition-transform', menu.classes.bgIcon, menu.classes.textIcon]"
                            v-html="menu.icon">
                        </div>
                        <div class="ml-4">
                            <h3
                                :class="['text-base sm:text-lg font-bold text-slate-800 transition-colors tracking-tight', menu.classes.hoverText]">
                                {{ menu.title }}
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5 font-medium">{{ menu.desc }}</p>
                        </div>
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const navigasiKe = (path) => router.push(path);

const daftarMenu = [
    {
        title: 'Dashboard & Laporan',
        desc: 'Statistik & Laba Rugi per bulan',
        path: '/dashboard',
        classes: {
            hoverBorder: 'hover:border-indigo-300',
            bgIcon: 'bg-indigo-50',
            textIcon: 'text-indigo-700',
            hoverText: 'group-hover:text-indigo-700'
        },
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>'
    },
    {
        title: 'Input Biaya',
        desc: 'Biaya Pemasaran, Admin, Sewa',
        path: '/biaya',
        classes: {
            hoverBorder: 'hover:border-rose-300',
            bgIcon: 'bg-rose-50',
            textIcon: 'text-rose-700',
            hoverText: 'group-hover:text-rose-700'
        },
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    },
    {
        title: 'Scan Produk',
        desc: 'Scan Barcode untuk penjualan',
        path: '/scan',
        classes: {
            hoverBorder: 'hover:border-teal-300',
            bgIcon: 'bg-teal-50',
            textIcon: 'text-teal-700',
            hoverText: 'group-hover:text-teal-700'
        },
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>'
    },
    {
        title: 'Input Produk',
        desc: 'Catat produk baru',
        path: '/input',
        classes: {
            hoverBorder: 'hover:border-purple-300',
            bgIcon: 'bg-purple-50',
            textIcon: 'text-purple-700',
            hoverText: 'group-hover:text-purple-700'
        },
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>'
    },
    {
        title: 'Daftar Produk',
        desc: 'Daftar produk, edit, tambah stok, dan hapus barang',
        path: '/list',
        classes: {
            hoverBorder: 'hover:border-emerald-300',
            bgIcon: 'bg-emerald-50',
            textIcon: 'text-emerald-700',
            hoverText: 'group-hover:text-emerald-700'
        },
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>'
    },
    {
        title: 'Riwayat Penjualan',
        desc: 'Riwayat nota & transaksi',
        path: '/history',
        classes: {
            hoverBorder: 'hover:border-amber-300',
            bgIcon: 'bg-amber-50',
            textIcon: 'text-amber-700',
            hoverText: 'group-hover:text-amber-700'
        },
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>'
    },
    {
        title: 'Kalkulator HPP',
        desc: 'Hitung HPP per produk & Harga Jual',
        path: '/hpp',
        classes: {
            hoverBorder: 'hover:border-blue-300',
            bgIcon: 'bg-blue-50',
            textIcon: 'text-blue-700',
            hoverText: 'group-hover:text-blue-700'
        },
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>'
    }
];
</script>