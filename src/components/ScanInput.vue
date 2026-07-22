<template>
    <div class="flex flex-col relative z-10">

        <!-- Tombol Scan Barcode Utama -->
        <button @click="$emit('scan')"
            class="group relative w-full flex items-center justify-center gap-2 p-4 rounded-[1.5rem] bg-teal-600 shadow-md hover:bg-teal-700 active:scale-95 transition-all duration-300 overflow-hidden">
            <!-- Efek Animasi Hover (Lingkaran) -->
            <div
                class="absolute -top-6 -right-6 w-20 h-20 bg-teal-500 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500">
            </div>

            <svg class="w-6 h-6 sm:w-5 sm:h-5 text-teal-100 z-10 group-hover:-rotate-12 transition-transform duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                </path>
            </svg>
            <span class="text-sm font-bold text-teal-50 z-10 tracking-wide">
                Mulai Pindai Barcode
            </span>
        </button>

        <!-- Divider / Pemisah -->
        <div class="flex items-center gap-3 my-5">
            <div class="h-[2px] border-t-2 border-dashed border-teal-400/60 flex-1"></div>
            <span
                class="text-[11px] font-extrabold text-teal-800 uppercase tracking-widest bg-teal-300/40 px-3 py-1 rounded-lg shadow-inner">
                Atau
            </span>
            <div class="h-[2px] border-t-2 border-dashed border-teal-400/60 flex-1"></div>
        </div>

        <!-- Area Input Manual & Cari Produk -->
        <div class="flex flex-col gap-3">

            <!-- Group Input Manual -->
            <div class="flex gap-2 w-full">
                <input v-model="manualId" @keyup.enter="handleTambahManual" type="text" placeholder="Masukkan ID..."
                    class="flex-1 min-w-0 px-5 py-3.5 text-teal-950 placeholder:text-teal-700/50 bg-teal-300/50 border border-teal-400/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-inner backdrop-blur-sm font-semibold" />

                <button @click="handleTambahManual"
                    class="shrink-0 px-6 py-3.5 text-sm font-bold text-teal-50 bg-teal-500 hover:bg-teal-600 active:scale-95 rounded-2xl transition-all shadow-md flex items-center justify-center">
                    Tambah
                </button>
            </div>

            <!-- Tombol Cari Produk -->
            <button @click="$emit('buka-pencarian')"
                class="w-full flex items-center justify-center gap-2 p-4 rounded-[1.5rem] bg-teal-300/60 border border-teal-400/50 shadow-sm hover:bg-teal-400/80 active:scale-95 transition-all duration-300 backdrop-blur-sm">
                <svg class="w-5 h-5 text-teal-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span class="text-sm font-bold text-teal-900 tracking-wide">
                    Cari Produk Berdasarkan Nama
                </span>
            </button>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['scan', 'tambah-manual', 'buka-pencarian']);

const manualId = ref('');

const handleTambahManual = () => {
    if (manualId.value.trim() === '') return;
    emit('tambah-manual', manualId.value.trim());
    manualId.value = ''; // Reset input after adding
};
</script>
