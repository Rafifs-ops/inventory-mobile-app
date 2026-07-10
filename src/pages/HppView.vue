<template>
    <div
        class="min-h-screen bg-gradient-to-br from-blue-800 to-blue-600 text-white flex flex-col sm:items-center sm:py-12">

        <div
            class="w-full sm:max-w-lg bg-gradient-to-br from-blue-800 to-blue-600 sm:border sm:border-slate-200 sm:shadow-sm sm:rounded-2xl flex-grow sm:flex-grow-0 flex flex-col">

            <div class="px-5 pt-8 pb-6 sm:px-6 sm:pt-6 sm:pb-4 sm:border-none text-center sm:text-left">
                <h2 class="text-2xl font-bold text-white tracking-tight">Kalkulator HPP</h2>
                <p class="text-sm text-white mt-1.5 leading-relaxed">
                    Hitung Harga Pokok Penjualan dan simulasi target keuntungan
                </p>
            </div>

            <div class="px-5 py-6 sm:px-6 space-y-6 flex-grow">

                <div class="space-y-5 sm:space-y-4">
                    <div>
                        <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-white">Total Biaya
                            Operasional</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-3 pointer-events-none">
                                <span class="text-slate-500 text-base sm:text-sm font-medium">Rp</span>
                            </div>
                            <input v-model="ops" type="number" min="0" placeholder="0"
                                class="w-full pl-12 sm:pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-500 bg-slate-100 border border-slate-300 rounded-xl sm:rounded-lg cursor-not-allowed">
                        </div>
                    </div>

                    <div>
                        <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-white">Total Biaya Bahan
                            Baku</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-4 sm:pl-3 pointer-events-none">
                                <span class="text-slate-500 text-base sm:text-sm font-medium">Rp</span>
                            </div>
                            <input v-model="bahan" type="number" min="0" placeholder="0"
                                class="w-full pl-12 sm:pl-10 pr-4 py-3 sm:py-2.5 text-base sm:text-sm text-slate-500 bg-slate-100 border border-slate-300 rounded-xl sm:rounded-lg cursor-not-allowed">
                        </div>
                    </div>

                    <div>
                        <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-white">Jumlah Produk
                            Dihasilkan</label>
                        <div class="relative">
                            <input v-model="qty" type="number" min="0" placeholder="0"
                                class="w-full pl-4 pr-16 sm:pr-12 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors">
                            <div class="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-3 pointer-events-none">
                                <span class="text-slate-500 text-base sm:text-sm font-medium">Unit</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="bg-slate-50 border border-slate-200 rounded-xl sm:rounded-lg p-5 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <span class="text-sm font-semibold text-slate-600">Hasil HPP per Unit</span>
                    <span class="text-2xl sm:text-xl font-bold text-slate-900 tracking-tight">Rp {{
                        hasilHpp.toLocaleString('id-ID') }}</span>
                </div>

                <div class="border-t border-slate-100"></div>

                <div class="space-y-5 sm:space-y-4">
                    <div>
                        <label class="block mb-2 sm:mb-1.5 text-sm font-semibold text-white">Target
                            Keuntungan</label>
                        <div class="relative w-full sm:w-1/2">
                            <input v-model="margin" type="number" min="0" placeholder="0"
                                class="w-full pl-4 pr-12 sm:pr-8 py-3 sm:py-2.5 text-base sm:text-sm text-slate-900 bg-slate-50 border border-slate-300 rounded-xl sm:rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors">
                            <div class="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-3 pointer-events-none">
                                <span class="text-slate-500 text-base sm:text-sm font-medium">%</span>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-emerald-50/80 sm:bg-emerald-50 border border-emerald-200 rounded-xl sm:rounded-lg p-5 sm:p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span class="text-sm font-bold text-emerald-800">Rekomendasi Harga Jual</span>
                        <span class="text-3xl sm:text-2xl font-bold text-emerald-600 tracking-tight">Rp {{
                            hargaJual.toLocaleString('id-ID') }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="py-6 sm:py-0 sm:mt-6 w-full sm:max-w-lg flex justify-center">
            <RouterLink to="/"
                class="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Menu Utama
            </RouterLink>
        </div>

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