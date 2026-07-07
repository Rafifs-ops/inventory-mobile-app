<template>
    <div
        class="min-h-screen bg-white sm:bg-slate-50 text-slate-900 flex flex-col sm:items-center sm:justify-center sm:py-12">

        <div
            class="w-full sm:max-w-lg bg-white sm:rounded-2xl sm:shadow-xl sm:border sm:border-slate-200 overflow-hidden flex-grow sm:flex-grow-0 flex flex-col">

            <div class="bg-slate-900 px-6 py-10 sm:py-12 text-center border-b-4 border-blue-600">
                <h1 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Smart Inventory
                </h1>
                <p class="text-slate-400 text-sm sm:text-base mt-2.5 font-medium">
                    Sistem Manajemen Inventaris Terpadu
                </p>
            </div>

            <div class="p-5 sm:p-8 flex-grow bg-slate-50 sm:bg-white">
                <div class="grid grid-cols-1 gap-3.5 sm:gap-4">

                    <button @click="navigasiKe('/dashboard')"
                        class="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-indigo-300 hover:shadow-md active:bg-slate-100 transition-all text-left shadow-sm sm:shadow-none">
                        <div
                            class="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-indigo-50 text-indigo-700 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                            <svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base sm:text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors tracking-tight">
                                Dashboard & Laporan
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5 font-medium">Statistik & Laba Rugi per bulan</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/biaya')"
                        class="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-rose-300 hover:shadow-md active:bg-slate-100 transition-all text-left shadow-sm sm:shadow-none">
                        <div
                            class="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-rose-50 text-rose-700 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                            <svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base sm:text-lg font-bold text-slate-800 group-hover:text-rose-700 transition-colors tracking-tight">
                                Input Biaya
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5 font-medium">Biaya Operasional, Bahan baku,
                                Pemasaran, Admin, Sewa</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/scan')"
                        class="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-teal-300 hover:shadow-md active:bg-slate-100 transition-all text-left shadow-sm sm:shadow-none">
                        <div
                            class="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-teal-50 text-teal-700 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                            <svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base sm:text-lg font-bold text-slate-800 group-hover:text-teal-700 transition-colors tracking-tight">
                                Scan Produk
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5 font-medium">Scan Barcode untuk penjualan</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/input')"
                        class="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-purple-300 hover:shadow-md active:bg-slate-100 transition-all text-left shadow-sm sm:shadow-none">
                        <div
                            class="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-purple-50 text-purple-700 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                            <svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base sm:text-lg font-bold text-slate-800 group-hover:text-purple-700 transition-colors tracking-tight">
                                Input Produk
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5 font-medium">Catat produk baru</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/list')"
                        class="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-emerald-300 hover:shadow-md active:bg-slate-100 transition-all text-left shadow-sm sm:shadow-none">
                        <div
                            class="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-emerald-50 text-emerald-700 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                            <svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base sm:text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors tracking-tight">
                                Daftar Produk
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5 font-medium">Daftar produk, edit, tambah stok, dan
                                hapus barang</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/history')"
                        class="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-amber-300 hover:shadow-md active:bg-slate-100 transition-all text-left shadow-sm sm:shadow-none">
                        <div
                            class="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-amber-50 text-amber-700 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                            <svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base sm:text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors tracking-tight">
                                Riwayat Penjualan
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5 font-medium">Riwayat nota & transaksi</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/hpp')"
                        class="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-blue-300 hover:shadow-md active:bg-slate-100 transition-all text-left shadow-sm sm:shadow-none">
                        <div
                            class="flex items-center justify-center w-14 h-14 sm:w-12 sm:h-12 bg-blue-50 text-blue-700 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                            <svg class="w-7 h-7 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base sm:text-lg font-bold text-slate-800 group-hover:text-blue-700 transition-colors tracking-tight">
                                Kalkulator HPP
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5 font-medium">Hitung HPP per produk & Harga Jual</p>
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

const navigasiKe = (path) => {
    router.push(path);
};
</script>