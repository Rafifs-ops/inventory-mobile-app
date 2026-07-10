<template>
    <div
        class="p-4 sm:p-5 bg-white border border-slate-200 rounded-2xl sm:rounded-xl shadow-sm hover:border-blue-300 transition-colors">

        <div class="flex justify-between items-start gap-4">
            <div class="flex-1">
                <div class="flex items-center flex-wrap gap-2 mb-1.5">
                    <h4 class="text-base font-bold text-slate-900 leading-tight">
                        {{ produk.nama }}
                        <span class="text-sm font-semibold text-blue-600 ml-1">x{{ produk.quantity }}</span>
                    </h4>
                    <span
                        class="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 rounded-md uppercase tracking-wider">
                        Berhasil
                    </span>
                </div>
                <p class="text-sm font-bold text-slate-700">
                    Rp {{ (produk.harga * produk.quantity).toLocaleString('id-ID') }}
                    <span class="text-xs text-slate-500 font-medium ml-1">
                        (@Rp {{ produk.harga.toLocaleString('id-ID') }})
                    </span>
                </p>
            </div>
        </div>

        <div
            class="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
            <div class="flex gap-2">
                <span
                    class="text-slate-500 font-mono font-medium bg-slate-50 px-2 py-1 rounded-md border border-slate-200">
                    ID: {{ produk.id }}
                </span>
                <button @click="$emit('hapus')"
                    class="text-rose-600 bg-rose-50 px-2 py-1 rounded-md font-bold hover:bg-rose-100 mr-2">
                    Batal
                </button>
            </div>

            <span
                class="font-bold text-emerald-600 flex items-center gap-1.5 bg-emerald-50/50 px-2 py-1 rounded-md">
                Margin Rp {{ (((produk.harga - (produk.hpp || 0)) *
                    produk.quantity)).toLocaleString('id-ID')
                }}
            </span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    produk: {
        type: Object,
        required: true
    }
});

defineEmits(['hapus']);
</script>
