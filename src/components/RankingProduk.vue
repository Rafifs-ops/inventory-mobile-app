<template>
    <div class="px-5 py-4 border-b border-slate-100 bg-slate-50">
        <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
            Ranking Produk (Bulan Ini)
        </h3>
    </div>

    <div class="p-5 space-y-4">
        <div class="flex items-start">
            <div class="flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </div>
            <div class="ml-3.5">
                <p class="text-sm font-bold text-slate-800">Produk paling laku</p>
                <p class="text-sm text-slate-500 mt-1">
                    {{ produkTerlaris.nama }} &mdash; <span class="font-semibold text-slate-700">{{
                        produkTerlaris.qty }} unit</span> terjual
                </p>
            </div>
        </div>

        <div class="border-t border-slate-100"></div>

        <div class="flex items-start">
            <div class="flex-shrink-0 mt-0.5">
                <svg class="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
            <div class="ml-3.5">
                <p class="text-sm font-bold text-slate-800">Produk paling sepi</p>
                <p class="text-sm text-slate-500 mt-1">
                    {{ produkPalingSepi.nama }} &mdash; <span class="font-semibold text-slate-700">{{
                        produkPalingSepi.qty }} unit</span> terjual
                </p>
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