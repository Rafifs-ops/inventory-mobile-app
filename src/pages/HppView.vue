<template>
    <div class="min-h-screen bg-gray-50 text-slate-800 p-6 flex flex-col items-center py-12">

        <div class="w-full max-w-lg mb-6 text-center">
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Kalkulator HPP</h2>
            <p class="text-sm text-slate-500 mt-1">Hitung Harga Pokok Penjualan dan simulasi margin keuntungan</p>
        </div>

        <div class="w-full max-w-lg bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden p-6 space-y-6">

            <div class="space-y-4">
                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">Total Biaya Operasional</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span class="text-slate-500 sm:text-sm">Rp</span>
                        </div>
                        <input v-model="ops" type="number" min="0" placeholder="0"
                            class="w-full p-2.5 pl-10 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow">
                    </div>
                </div>

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">Total Biaya Bahan Baku</label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span class="text-slate-500 sm:text-sm">Rp</span>
                        </div>
                        <input v-model="bahan" type="number" min="0" placeholder="0"
                            class="w-full p-2.5 pl-10 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow">
                    </div>
                </div>

                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">Jumlah Produk Dihasilkan</label>
                    <div class="relative">
                        <input v-model="qty" type="number" min="0" placeholder="0"
                            class="w-full p-2.5 pr-12 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <span class="text-slate-500 sm:text-sm">Unit</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-between items-center">
                <span class="text-sm font-medium text-slate-600">Hasil HPP per Unit</span>
                <span class="text-xl font-bold text-slate-800">Rp {{ hasilHpp.toLocaleString('id-ID') }}</span>
            </div>

            <div class="border-t border-gray-100"></div>

            <div class="space-y-4">
                <div>
                    <label class="block mb-1.5 text-sm font-medium text-slate-700">Simulasi Margin Keuntungan</label>
                    <div class="relative w-full sm:w-1/2">
                        <input v-model="margin" type="number" min="0" placeholder="0"
                            class="w-full p-2.5 pr-8 text-slate-800 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow">
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <span class="text-slate-500 sm:text-sm">%</span>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span class="text-sm font-medium text-emerald-800">Rekomendasi Harga Jual</span>
                    <span class="text-2xl font-bold text-emerald-600">Rp {{ hargaJual.toLocaleString('id-ID') }}</span>
                </div>
            </div>
        </div>

        <RouterLink to="/"
            class="mt-6 flex items-center justify-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Menu Utama
        </RouterLink>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const ops = ref(0);
const bahan = ref(0);
const qty = ref(1);
const margin = ref(0);

const hasilHpp = computed(() => {
    if (qty.value <= 0) return 0;
    return (Number(ops.value) + Number(bahan.value)) / Number(qty.value);
});

const hargaJual = computed(() => {
    return hasilHpp.value + (hasilHpp.value * (Number(margin.value) / 100));
});
</script>