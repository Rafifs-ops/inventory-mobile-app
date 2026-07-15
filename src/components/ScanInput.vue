<template>
    <div class="flex flex-col">
        <button @click="$emit('scan')"
            class="w-full flex items-center justify-center gap-2 py-4 sm:py-3.5 text-base sm:text-sm font-bold text-white transition-all bg-gradient-to-br from-green-600 to-green-400 border border-transparent rounded-2xl sm:rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg active:bg-green-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
            <svg class="w-6 h-6 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                </path>
            </svg>
            Mulai Pindai Barcode
        </button>

        <div class="flex items-center gap-3 mt-5 mb-5">
            <div class="h-px bg-slate-200 flex-1"></div>
            <span class="text-xs font-medium text-white uppercase tracking-wider">Atau</span>
            <div class="h-px bg-slate-200 flex-1"></div>
        </div>

        <div class="flex flex-col gap-3">
            <div class="flex gap-2 w-full">
                <input v-model="manualId" @keyup.enter="handleTambahManual" type="text"
                    placeholder="Masukkan ID manual..."
                    class="flex-1 min-w-0 px-4 py-4 sm:py-3.5 text-base sm:text-sm bg-white border border-slate-200 rounded-2xl sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-shadow shadow-sm" />
                <button @click="handleTambahManual"
                    class="shrink-0 px-4 sm:px-6 py-4 sm:py-3.5 text-base sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-900 active:scale-[0.99] rounded-2xl sm:rounded-xl transition-all shadow-sm">
                    Tambah
                </button>
            </div>
            <button @click="$emit('buka-pencarian')"
                class="w-full flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all shadow-sm">
                <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari Produk Berdasarkan Nama
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
