<template>
    <!-- Latar Belakang Utama: Slate kebiruan (Tanpa Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-indigo-300 selection:text-indigo-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-8 pb-8 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header -->
            <div class="text-center z-10">
                <h2 class="text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">Kalkulator HPP</h2>
                <div
                    class="mt-2 bg-blue-800/40 px-5 py-1.5 rounded-full border border-blue-300/30 backdrop-blur-md inline-block shadow-inner">
                    <p class="text-cyan-100 text-xs font-semibold tracking-wide">
                        Simulasi Harga Pokok & Keuntungan
                    </p>
                </div>
            </div>
        </div>

        <!-- Bagian Konten Form (Bento Style Card - Tema Indigo) -->
        <div class="flex-grow px-5 pt-6 pb-12 w-full max-w-xl mx-auto flex flex-col gap-4">

            <div
                class="relative bg-indigo-200 p-6 sm:p-8 rounded-[2rem] shadow-sm border-2 border-indigo-300/40 overflow-hidden flex flex-col gap-5">

                <!-- Lingkaran Dekoratif di dalam Card -->
                <div
                    class="absolute -right-16 -top-16 w-48 h-48 bg-indigo-300 rounded-full opacity-40 pointer-events-none">
                </div>
                <div
                    class="absolute -left-10 bottom-20 w-32 h-32 bg-indigo-300 rounded-full opacity-30 pointer-events-none">
                </div>

                <!-- Bagian 1: Input Data -->
                <div class="space-y-4 relative z-10">

                    <!-- Total Biaya Operasional (Readonly) -->
                    <div>
                        <label class="block mb-2 text-[11px] font-bold text-indigo-900 uppercase tracking-widest pl-1">
                            Total Biaya Operasional
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center z-10 pl-5">
                                <span class="text-indigo-800/50 font-bold text-sm">Rp</span>
                            </div>
                            <input v-model="ops" type="number"
                                class="w-full pl-14 pr-5 py-3.5 text-indigo-900/60 bg-indigo-300/30 border border-indigo-300/50 rounded-2xl shadow-inner focus:outline-none font-semibold backdrop-blur-sm">
                        </div>
                    </div>

                    <!-- Total Biaya Bahan Baku (Readonly) -->
                    <div>
                        <label class="block mb-2 text-[11px] font-bold text-indigo-900 uppercase tracking-widest pl-1">
                            Total Biaya Bahan Baku
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-5 z-10">
                                <span class="text-indigo-800/50 font-bold text-sm">Rp</span>
                            </div>
                            <input v-model="bahan" type="number"
                                class="w-full pl-14 pr-5 py-3.5 text-indigo-900/60 bg-indigo-300/30 border border-indigo-300/50 rounded-2xl shadow-inner focus:outline-none font-semibold backdrop-blur-sm">
                        </div>
                    </div>

                    <!-- Jumlah Produk Dihasilkan (Editable) -->
                    <div>
                        <label class="block mb-2 text-[11px] font-bold text-indigo-900 uppercase tracking-widest pl-1">
                            Jumlah Produk Dihasilkan
                        </label>
                        <div class="relative">
                            <input v-model="qty" type="number" min="0" placeholder="0"
                                class="w-full pl-5 pr-16 py-3.5 text-indigo-950 placeholder:text-indigo-700/50 bg-indigo-300/60 border border-indigo-400/50 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold backdrop-blur-sm">
                            <div
                                class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none bg-indigo-400/30 rounded-r-2xl border-l border-indigo-400/30 px-3">
                                <span class="text-indigo-800 font-bold text-xs uppercase tracking-wide">Unit</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Hasil HPP (Mini Bento Box) -->
                <div
                    class="relative z-10 bg-indigo-400/40 border border-indigo-300/50 rounded-2xl p-4 sm:p-5 flex flex-row justify-between items-center shadow-inner backdrop-blur-md">
                    <span class="text-xs font-bold text-indigo-900 uppercase tracking-wider">HPP per Unit</span>
                    <span class="text-xl sm:text-2xl font-extrabold text-indigo-950 tracking-tight">
                        Rp {{ hasilHpp.toLocaleString('id-ID') }}
                    </span>
                </div>

                <!-- Divider Modern -->
                <div class="relative z-10 border-t-2 border-dashed border-indigo-300/60 my-1"></div>

                <!-- Bagian 2: Target Keuntungan -->
                <div class="space-y-4 relative z-10">
                    <div>
                        <label class="block mb-2 text-[11px] font-bold text-indigo-900 uppercase tracking-widest pl-1">
                            Target Keuntungan
                        </label>
                        <div class="relative w-full sm:w-1/2">
                            <input v-model="margin" type="number" min="0" placeholder="0"
                                class="w-full pl-5 pr-14 py-3.5 text-indigo-950 placeholder:text-indigo-700/50 bg-indigo-300/60 border border-indigo-400/50 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-semibold backdrop-blur-sm">
                            <div class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
                                <span class="text-indigo-800 font-bold text-lg">%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Rekomendasi Harga Jual (Emerald Bento Highlight) -->
                    <div
                        class="group relative bg-emerald-300 border-2 border-emerald-400/50 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 shadow-md overflow-hidden transition-all hover:shadow-lg">
                        <div
                            class="absolute -right-8 -bottom-8 w-24 h-24 bg-emerald-400 rounded-full opacity-40 group-hover:scale-150 transition-transform duration-500 pointer-events-none">
                        </div>
                        <span
                            class="relative z-10 text-[11px] font-extrabold text-emerald-900 uppercase tracking-widest bg-emerald-400/40 px-3 py-1.5 rounded-lg shadow-inner">
                            Rekomendasi Harga Jual
                        </span>
                        <span
                            class="relative z-10 text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight drop-shadow-sm mt-1 sm:mt-0">
                            Rp {{ hargaJual.toLocaleString('id-ID') }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Tombol Kembali -->
            <RouterLink to="/"
                class="mt-2 py-4 px-6 rounded-full bg-slate-300 shadow-sm border border-slate-400/40 flex items-center justify-center text-sm font-bold text-slate-700 hover:bg-slate-400 hover:text-slate-900 active:scale-95 transition-all">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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