<template>
    <div class="flex flex-col h-full relative z-10">

        <!-- Bagian Header -->
        <div
            class="px-5 sm:px-6 py-4 bg-purple-300/40 border-b-2 border-dashed border-purple-400/40 backdrop-blur-sm flex items-center gap-2">
            <svg class="w-4 h-4 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3 class="text-[11px] font-extrabold text-purple-900 uppercase tracking-widest">
                Ranking Produk (Bulan Ini)
            </h3>
        </div>

        <!-- Bagian Konten -->
        <div class="p-5 sm:p-6 flex flex-col gap-4">

            <!-- Produk Paling Laku (Mini Bento Card) -->
            <div
                class="group flex items-center gap-4 bg-purple-300/20 p-4 rounded-2xl border border-purple-300/50 shadow-inner hover:bg-purple-300/40 transition-colors">
                <!-- Icon Box -->
                <div
                    class="shrink-0 w-12 h-12 bg-emerald-300 rounded-[1rem] shadow-sm flex items-center justify-center text-emerald-900 group-hover:-translate-y-1 transition-transform duration-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                </div>

                <!-- Detail Produk -->
                <div class="flex-1 min-w-0">
                    <p class="text-[10px] font-bold text-purple-800 uppercase tracking-widest mb-0.5">Paling Laku</p>
                    <p class="text-sm font-extrabold text-purple-950 truncate">{{ produkTerlaris.nama }}</p>
                </div>

                <!-- Jumlah Terjual -->
                <div class="shrink-0 text-right bg-purple-400/30 px-3 py-1.5 rounded-xl border border-purple-400/40">
                    <span class="block text-lg font-extrabold text-center text-emerald-800 leading-none">{{
                        produkTerlaris.qty
                        }}</span>
                    <span class="block text-[9px] font-bold text-purple-800 uppercase tracking-widest mt-1">Unit</span>
                </div>
            </div>

            <!-- Produk Paling Sepi (Mini Bento Card) -->
            <div
                class="group flex items-center gap-4 bg-purple-300/20 p-4 rounded-2xl border border-purple-300/50 shadow-inner hover:bg-purple-300/40 transition-colors">
                <!-- Icon Box -->
                <div
                    class="shrink-0 w-12 h-12 bg-rose-300 rounded-[1rem] shadow-sm flex items-center justify-center text-rose-900 group-hover:translate-y-1 transition-transform duration-300">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                </div>

                <!-- Detail Produk -->
                <div class="flex-1 min-w-0">
                    <p class="text-[10px] font-bold text-purple-800 uppercase tracking-widest mb-0.5">Paling Sepi</p>
                    <p class="text-sm font-extrabold text-purple-950 truncate">{{ produkPalingSepi.nama }}</p>
                </div>

                <!-- Jumlah Terjual -->
                <div class="shrink-0 text-right bg-purple-400/30 px-3 py-1.5 rounded-xl border border-purple-400/40">
                    <span class="block text-lg font-extrabold text-center text-rose-800 leading-none">{{
                        produkPalingSepi.qty
                        }}</span>
                    <span class="block text-[9px] font-bold text-purple-800 uppercase tracking-widest mt-1">Unit</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    produkTerlaris: {
        type: Object,
        default: () => ({})
    },
    produkPalingSepi: {
        type: Object,
        default: () => ({})
    }
});
</script>