<template>
    <!-- Latar Belakang Utama: Menggunakan Slate yang kebiruan (Tidak Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-blue-300 selection:text-blue-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-6 pb-6 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak agar tidak kaku -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <h1 class="text-4xl font-extrabold tracking-tight text-blue-300 drop-shadow-md z-10">
                SmartPOS <span class="text-green-300 font-bold text-xl sm:text-base">UMKM</span>
            </h1>

            <div
                class="mt-4 bg-blue-800/40 px-6 py-2 rounded-2xl border border-blue-300/30 backdrop-blur-md z-10 shadow-inner">
                <p class="text-cyan-100 text-sm font-semibold tracking-wide">
                    Sistem Point of Sale Terpadu
                </p>
            </div>
        </div>

        <!-- Bagian Daftar Menu (Bento Grid Layout) -->
        <div class="flex-grow px-5 pt-8 pb-12 overflow-y-auto">
            <div class="grid grid-cols-2 gap-4">
                <button v-for="(menu, index) in daftarMenu" :key="index" @click="navigasiKe(menu.path)" :class="[
                    'group relative flex p-5 rounded-[2rem] shadow-sm hover:shadow-lg active:scale-[0.95] transition-all duration-300 text-left border border-transparent overflow-hidden',
                    menu.colSpan || 'col-span-1 flex-col',
                    menu.bgCard
                ]">

                    <!-- Lingkaran Dekoratif Transparan di dalam Kartu -->
                    <div
                        :class="['absolute -right-6 -bottom-6 w-28 h-28 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150', menu.bgIcon]">
                    </div>

                    <!-- Wadah Icon -->
                    <div :class="[
                        'shrink-0 rounded-[1.25rem] flex items-center justify-center shadow-inner relative z-10 group-hover:-translate-y-1 transition-transform duration-300',
                        menu.colSpan === 'col-span-2 flex-row items-center' ? 'w-16 h-16 mr-4 mb-0' : 'w-14 h-14 mb-4',
                        menu.bgIcon, menu.textIcon
                    ]" v-html="menu.icon"></div>

                    <!-- Wadah Teks -->
                    <div class="relative z-10 flex flex-col justify-center flex-grow">
                        <h3
                            :class="['font-bold leading-tight tracking-wide mb-1 transition-colors', menu.colSpan ? 'text-xl' : 'text-lg', menu.textTitle]">
                            {{ menu.title }}
                        </h3>
                        <p :class="['text-xs leading-relaxed font-medium', menu.textDesc]">
                            {{ menu.desc }}
                        </p>
                    </div>
                </button>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const navigasiKe = (path) => router.push(path);

// Modifikasi data dengan tema warna spesifik (Tanpa putih, kaya warna, formal)
const daftarMenu = [
    {
        title: 'Kasir & Transaksi',
        desc: 'Proses kasir untuk penjualan dengan cepat',
        path: '/scan',
        colSpan: 'col-span-2 flex-row items-center',
        bgCard: 'bg-emerald-200 hover:border-emerald-400',
        bgIcon: 'bg-emerald-300',
        textIcon: 'text-emerald-800',
        textTitle: 'text-emerald-900',
        textDesc: 'text-emerald-800',
        icon: '<svg class="w-8 h-8 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>'
    },
    {
        title: 'Dashboard & Laporan',
        desc: 'Statistik & Laba Rugi bulanan',
        path: '/dashboard',
        colSpan: 'col-span-2 flex-row items-center',
        bgCard: 'bg-blue-300 hover:border-blue-400',
        bgIcon: 'bg-blue-400',
        textIcon: 'text-blue-900',
        textTitle: 'text-blue-950',
        textDesc: 'text-blue-800',
        icon: '<svg class="w-8 h-8 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>'
    },
    {
        title: 'Input Biaya',
        desc: 'Biaya Marketing, Admin, dll',
        path: '/biaya',
        bgCard: 'bg-rose-200 hover:border-rose-400',
        bgIcon: 'bg-rose-300',
        textIcon: 'text-rose-800',
        textTitle: 'text-rose-950',
        textDesc: 'text-rose-800',
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    },
    {
        title: 'Catat Produk',
        desc: 'Entri produk baru',
        path: '/input',
        bgCard: 'bg-purple-200 hover:border-purple-400',
        bgIcon: 'bg-purple-300',
        textIcon: 'text-purple-800',
        textTitle: 'text-purple-950',
        textDesc: 'text-purple-800',
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>'
    },
    {
        title: 'Daftar Produk',
        desc: 'Edit, tambah stok & hapus',
        path: '/list',
        bgCard: 'bg-cyan-200 hover:border-cyan-400',
        bgIcon: 'bg-cyan-300',
        textIcon: 'text-cyan-800',
        textTitle: 'text-cyan-950',
        textDesc: 'text-cyan-800',
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>'
    },
    {
        title: 'Riwayat Jual',
        desc: 'Riwayat nota transaksi',
        path: '/history',
        bgCard: 'bg-amber-200 hover:border-amber-400',
        bgIcon: 'bg-amber-300',
        textIcon: 'text-amber-800',
        textTitle: 'text-amber-950',
        textDesc: 'text-amber-800',
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>'
    },
    {
        title: 'Kalkulator HPP',
        desc: 'Hitung HPP & Harga',
        path: '/hpp',
        bgCard: 'bg-indigo-200 hover:border-indigo-400',
        bgIcon: 'bg-indigo-300',
        textIcon: 'text-indigo-800',
        textTitle: 'text-indigo-950',
        textDesc: 'text-indigo-800',
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>'
    },
    {
        title: 'Panduan',
        desc: 'Penjelasan istilah',
        path: '/guide',
        bgCard: 'bg-teal-200 hover:border-teal-400',
        bgIcon: 'bg-teal-300',
        textIcon: 'text-teal-800',
        textTitle: 'text-teal-950',
        textDesc: 'text-teal-800',
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    },
    {
        title: 'Tentang Aplikasi',
        desc: 'Informasi Developer & Kebijakan Privasi',
        path: '/about',
        colSpan: 'col-span-2 flex-row items-center',
        bgCard: 'bg-slate-300 hover:border-slate-400',
        bgIcon: 'bg-slate-400',
        textIcon: 'text-slate-800',
        textTitle: 'text-slate-900',
        textDesc: 'text-slate-700',
        icon: '<svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    }
];
</script>