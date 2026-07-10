<template>
    <div class="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        <div
            class="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm flex flex-col justify-center">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Penjualan</p>
            <p class="mt-1.5 text-lg sm:text-xl font-bold text-slate-900 truncate tracking-tight">
                Rp {{ totalPenjualan.toLocaleString('id-ID') }}
            </p>
        </div>
        <div
            class="p-4 sm:p-5 bg-emerald-50 sm:bg-emerald-50/80 border border-emerald-100 rounded-2xl sm:rounded-xl shadow-sm flex flex-col justify-center">
            <p class="text-xs font-bold text-emerald-700 uppercase tracking-wider">Est. Keuntungan</p>
            <p class="mt-1.5 text-lg sm:text-xl font-bold text-emerald-700 truncate tracking-tight">
                Rp {{ totalKeuntungan.toLocaleString('id-ID') }}
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    totalPenjualan: {
        type: Number,
        required: true,
        default: 0
    },
    totalKeuntungan: {
        type: Number,
        required: true,
        default: 0
    }
});
</script>
