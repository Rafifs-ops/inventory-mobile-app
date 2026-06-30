<template>
    <div class="min-h-screen bg-gray-50 text-slate-800 p-6 flex flex-col items-center py-12">

        <div class="w-full max-w-2xl mb-8 text-center">
            <h2 class="text-2xl font-bold text-slate-800 tracking-tight">Daftar Inventaris</h2>
            <p class="text-sm text-slate-500 mt-1">Kelola dan pantau seluruh data barang yang terdaftar di sistem</p>
        </div>

        <div class="w-full max-w-2xl space-y-3">

            <div v-for="item in productList" :key="item.id"
                class="flex justify-between items-center p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow hover:border-blue-300 transition-all group">

                <div class="flex-1">
                    <div class="flex items-center gap-3 mb-2">
                        <h4 class="font-semibold text-slate-800 text-lg">{{ item.nama }}</h4>
                        <span
                            class="px-2 py-0.5 text-xs font-mono text-slate-500 bg-slate-100 rounded border border-slate-200">
                            ID: {{ item.id }}
                        </span>
                    </div>

                    <div class="flex items-center text-sm gap-6 mt-1">
                        <div>
                            <span class="text-slate-400 text-xs block mb-0.5">Harga Jual</span>
                            <span class="font-medium text-slate-700">Rp {{ item.harga.toLocaleString('id-ID') }}</span>
                        </div>
                        <div class="w-px h-6 bg-gray-200"></div>
                        <div>
                            <span class="text-slate-400 text-xs block mb-0.5">Harga Pokok (HPP)</span>
                            <span class="font-medium text-slate-700">Rp {{ (item.hpp || 0).toLocaleString('id-ID')
                            }}</span>
                        </div>
                    </div>
                </div>

                <div class="ml-4 pl-4 border-l border-gray-100 flex items-center">
                    <button @click="konfirmasiHapus(item.id, item.nama)"
                        class="p-2.5 text-slate-400 bg-white rounded-lg hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-colors"
                        title="Hapus Barang">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <div v-if="productList.length === 0"
                class="w-full p-12 text-center bg-white border border-gray-200 border-dashed rounded-xl shadow-sm">
                <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 class="mt-2 text-sm font-semibold text-slate-900">Belum ada data barang</h3>
                <p class="mt-1 text-sm text-slate-500">Tidak ada produk yang terdaftar di database saat ini.</p>
            </div>

        </div>

        <RouterLink to="/"
            class="mt-8 flex items-center justify-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Menu Utama
        </RouterLink>

    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useProducts } from '../composables/useProduct';

// Import deleteProduct dari composable
const { productList, loadProducts, deleteProduct } = useProducts();

onMounted(async () => {
    await loadProducts();
});

// Fungsi untuk memunculkan peringatan sebelum menghapus
const konfirmasiHapus = async (id, nama) => {
    // Menggunakan window.confirm bawaan untuk kemudahan
    const yakin = window.confirm(`Apakah Anda yakin ingin menghapus "${nama}" dari sistem?`);

    if (yakin) {
        await deleteProduct(id);
        // Opsional: Bisa tambahkan toast/alert berhasil dihapus di sini
    }
};
</script>