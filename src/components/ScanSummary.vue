<template>
    <div class="grid grid-cols-2 gap-3 sm:gap-4">

        <!-- Kartu 1: Total Penjualan -->
        <div
            class="relative p-4 sm:p-5 bg-teal-300/50 border border-teal-400/50 rounded-[1.5rem] shadow-inner flex flex-col justify-center overflow-hidden backdrop-blur-sm">
            <!-- Lingkaran Dekoratif Abstrak -->
            <div class="absolute -right-4 -bottom-4 w-16 h-16 bg-teal-400 rounded-full opacity-30 pointer-events-none">
            </div>

            <div class="relative z-10">
                <div class="flex items-center gap-1.5 mb-1">
                    <svg class="w-3.5 h-3.5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p class="text-[10px] sm:text-xs font-extrabold text-teal-800 uppercase tracking-widest">
                        Total Penjualan
                    </p>
                </div>
                <p class="text-lg sm:text-xl font-extrabold text-teal-950 truncate tracking-tight">
                    Rp {{ totalPenjualan.toLocaleString('id-ID') }}
                </p>
            </div>
        </div>

        <!-- Kartu 2: Est. Keuntungan (Tema Emerald untuk highlight profit) -->
        <div
            class="group relative p-4 sm:p-5 bg-emerald-300 border border-emerald-400/60 rounded-[1.5rem] shadow-sm flex flex-col justify-center overflow-hidden hover:shadow-md transition-all">
            <!-- Lingkaran Dekoratif Interaktif -->
            <div
                class="absolute -right-4 -top-4 w-16 h-16 bg-emerald-400 rounded-full opacity-40 pointer-events-none group-hover:scale-150 transition-transform duration-500">
            </div>

            <div class="relative z-10">
                <div class="flex items-center gap-1.5 mb-1">
                    <svg class="w-3.5 h-3.5 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p class="text-[10px] sm:text-xs font-extrabold text-emerald-900 uppercase tracking-widest">
                        Est. Keuntungan
                    </p>
                </div>
                <p class="text-lg sm:text-xl font-extrabold text-emerald-950 truncate tracking-tight drop-shadow-sm">
                    Rp {{ totalKeuntungan.toLocaleString('id-ID') }}
                </p>
            </div>
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
