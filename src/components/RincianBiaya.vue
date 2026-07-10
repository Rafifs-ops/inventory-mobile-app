<script setup>
import { defineProps, toRefs } from 'vue';

const props = defineProps({
    biayaPemasaran: Number,
    biayaListrikAirInternet: Number,
    biayaAdmin: Number,
    biayaPerlengkapan: Number,
    biayaPajak: Number,
    biayaSewa: Number,
    biayaLain: Number,
})

const {
    biayaPemasaran,
    biayaListrikAirInternet,
    biayaAdmin,
    biayaPerlengkapan,
    biayaPajak,
    biayaSewa,
    biayaLain,
} = toRefs(props);
</script>

<template>
    <div class="bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm mb-6 overflow-hidden">
        <div class="px-5 py-4 border-b border-slate-100 bg-slate-50">
            <h3 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
                Rincian Pengeluaran (Bulan Ini)
            </h3>
        </div>
        <div class="p-5">
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div
                    class="p-4 bg-orange-50/50 sm:bg-orange-50 rounded-xl border border-orange-100 flex flex-col justify-center">
                    <p class="text-xs font-bold text-orange-600 uppercase mb-1.5 tracking-wide">Pemasaran</p>
                    <p class="text-lg font-bold text-orange-700">Rp {{
                        biayaPemasaran.toLocaleString('id-ID')
                    }}</p>
                </div>
                <div
                    class="p-4 bg-green-50/50 sm:bg-green-50 rounded-xl border border-green-100 flex flex-col justify-center">
                    <p class="text-xs font-bold text-green-600 uppercase mb-1.5 tracking-wide">Listrik Air &
                        Internet</p>
                    <p class="text-lg font-bold text-green-700">Rp {{
                        biayaListrikAirInternet.toLocaleString('id-ID')
                    }}</p>
                </div>
                <div
                    class="p-4 bg-purple-50/50 sm:bg-purple-50 rounded-xl border border-purple-100 flex flex-col justify-center">
                    <p class="text-xs font-bold text-purple-600 uppercase mb-1.5 tracking-wide">Admin</p>
                    <p class="text-lg font-bold text-purple-700">Rp {{
                        biayaAdmin.toLocaleString('id-ID')
                    }}</p>
                </div>
                <div
                    class="p-4 bg-yellow-50/50 sm:bg-yellow-50 rounded-xl border border-yellow-100 flex flex-col justify-center">
                    <p class="text-xs font-bold text-yellow-600 uppercase mb-1.5 tracking-wide">Perlengkapan
                    </p>
                    <p class="text-lg font-bold text-yellow-700">Rp {{
                        biayaPerlengkapan.toLocaleString('id-ID')
                    }}</p>
                </div>
                <div
                    class="p-4 bg-red-50/50 sm:bg-red-50 rounded-xl border border-red-100 flex flex-col justify-center">
                    <p class="text-xs font-bold text-red-600 uppercase mb-1.5 tracking-wide">Pajak
                    </p>
                    <p class="text-lg font-bold text-red-700">Rp {{
                        biayaPajak.toLocaleString('id-ID')
                    }}</p>
                </div>
                <div
                    class="p-4 bg-sky-50/50 sm:bg-sky-50 rounded-xl border border-sky-100 flex flex-col justify-center">
                    <p class="text-xs font-bold text-sky-600 uppercase mb-1.5 tracking-wide">Sewa</p>
                    <p class="text-lg font-bold text-sky-700">Rp {{
                        biayaSewa.toLocaleString('id-ID')
                    }}</p>
                </div>
                <div
                    class="p-4 bg-slate-50/50 sm:bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-center">
                    <p class="text-xs font-bold text-slate-600 uppercase mb-1.5 tracking-wide">Lain-lain</p>
                    <p class="text-lg font-bold text-slate-700">Rp {{
                        biayaLain.toLocaleString('id-ID')
                    }}</p>
                </div>
            </div>
        </div>
    </div>
</template>