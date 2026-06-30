<template>
    <div class="min-h-screen bg-gray-50 text-gray-800 p-6 flex flex-col items-center justify-center">

        <div class="w-full max-w-lg bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

            <div class="bg-slate-800 px-6 py-8 text-center border-b-4 border-blue-600">
                <h1 class="text-3xl font-bold text-white tracking-tight">
                    Smart Inventory
                </h1>
                <p class="text-slate-300 text-sm mt-2 font-medium">
                    Sistem Manajemen Inventaris Terpadu
                </p>
            </div>

            <div class="p-6">
                <div class="grid grid-cols-1 gap-4">

                    <button @click="navigasiKe('/hpp')"
                        class="group flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 hover:shadow-sm transition-all text-left">
                        <div
                            class="flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-700 rounded-md shrink-0">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base font-semibold text-slate-800 group-hover:text-blue-700 transition-colors">
                                Kalkulator HPP
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5">Hitung HPP & Harga Jual</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/dashboard')"
                        class="group flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 hover:shadow-sm transition-all text-left">
                        <div
                            class="flex items-center justify-center w-12 h-12 bg-indigo-100 text-indigo-700 rounded-md shrink-0">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base font-semibold text-slate-800 group-hover:text-indigo-700 transition-colors">
                                Dashboard & Laporan
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5">Statistik & Laba Rugi</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/biaya')"
                        class="group flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 hover:shadow-sm transition-all text-left">
                        <div
                            class="flex items-center justify-center w-12 h-12 bg-rose-100 text-rose-700 rounded-md shrink-0">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base font-semibold text-slate-800 group-hover:text-rose-700 transition-colors">
                                Input Biaya
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5">Operasional & Bahan Baku</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/scan')"
                        class="group flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 hover:shadow-sm transition-all text-left">
                        <div
                            class="flex items-center justify-center w-12 h-12 bg-teal-100 text-teal-700 rounded-md shrink-0">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">
                                Cek Produk
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5">Pemindaian barcode data</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/input')"
                        class="group flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 hover:shadow-sm transition-all text-left">
                        <div
                            class="flex items-center justify-center w-12 h-12 bg-purple-100 text-purple-700 rounded-md shrink-0">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base font-semibold text-slate-800 group-hover:text-purple-700 transition-colors">
                                Input Barang
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5">Registrasi produk baru</p>
                        </div>
                    </button>

                    <button @click="navigasiKe('/list')"
                        class="group flex items-center p-4 bg-white border border-gray-200 rounded-lg hover:bg-slate-50 hover:border-blue-300 hover:shadow-sm transition-all text-left">
                        <div
                            class="flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-700 rounded-md shrink-0">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                            </svg>
                        </div>
                        <div class="ml-4">
                            <h3
                                class="text-base font-semibold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                Daftar Inventaris
                            </h3>
                            <p class="text-sm text-slate-500 mt-0.5">Database barang tersimpan</p>
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