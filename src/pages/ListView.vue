<template>
    <div class="min-h-screen bg-white sm:bg-slate-50 text-slate-900 pb-10 sm:py-12 flex flex-col items-center">

        <div
            class="w-full sm:max-w-3xl px-5 sm:px-0 pt-6 sm:pt-0 mb-6 sm:mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
                <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Daftar Inventaris</h2>
                <p class="text-sm text-slate-500 mt-1.5">Kelola dan pantau seluruh data barang yang terdaftar di sistem
                </p>
            </div>
        </div>

        <div class="w-full sm:max-w-3xl px-5 sm:px-0 space-y-4">

            <div v-for="item in productList" :key="item.id"
                class="relative p-5 sm:p-4 bg-white rounded-2xl sm:rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">

                <div class="flex-1 pr-10 sm:pr-0">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-2.5">
                        <h4 class="font-bold text-slate-900 text-lg leading-tight">{{ item.nama }}</h4>
                        <span
                            class="self-start sm:self-auto px-2.5 py-1 sm:py-0.5 text-xs font-mono font-medium text-slate-600 bg-slate-100 rounded-md sm:rounded border border-slate-200">
                            ID: {{ item.id }}
                        </span>
                    </div>

                    <div class="grid grid-cols-2 sm:flex sm:items-center text-sm gap-y-4 gap-x-4 sm:gap-6 mt-1">
                        <div>
                            <span
                                class="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1 sm:mb-0.5">Harga
                                Jual</span>
                            <span class="font-bold text-slate-800">Rp {{ item.harga.toLocaleString('id-ID') }}</span>
                        </div>

                        <div class="hidden sm:block w-px h-8 bg-slate-200"></div>

                        <div>
                            <span
                                class="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1 sm:mb-0.5">HPP</span>
                            <span class="font-bold text-slate-800">Rp {{ (item.hpp || 0).toLocaleString('id-ID')
                            }}</span>
                        </div>

                        <div class="hidden sm:block w-px h-8 bg-slate-200"></div>

                        <div class="col-span-2 sm:col-span-1 border-t border-slate-100 sm:border-0 pt-3 sm:pt-0">
                            <span
                                class="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-1 sm:mb-0.5">Stok
                                Tersedia</span>
                            <div class="flex items-center space-x-3 mt-1 sm:mt-0.5">
                                <button @click="kurangiStok(item)"
                                    class="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    :disabled="(item.quantity || 0) <= 0" title="Kurangi Stok">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M20 12H4" />
                                    </svg>
                                </button>
                                <span class="font-bold text-blue-700 text-base sm:text-sm min-w-[3.5rem] text-center">{{
                                    item.quantity || 0 }}
                                    Unit</span>
                                <button @click="tambahStok(item)"
                                    class="w-7 h-7 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    title="Tambah Stok">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-100 flex items-center gap-2">
                    <button @click="bukaEditModal(item)"
                        class="p-2 sm:p-2.5 text-slate-400 bg-slate-50 sm:bg-transparent border border-slate-200 sm:border-transparent rounded-xl sm:rounded-lg hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
                        title="Edit Barang">
                        <svg class="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
                    </button>
                    <button @click="konfirmasiHapus(item)"
                        class="p-2 sm:p-2.5 text-slate-400 bg-slate-50 sm:bg-transparent border border-slate-200 sm:border-transparent rounded-xl sm:rounded-lg hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 focus:outline-none focus:ring-2 focus:ring-rose-600 transition-colors"
                        title="Hapus Barang">
                        <svg class="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            <div v-if="productList.length === 0"
                class="w-full px-6 py-16 text-center bg-slate-50/50 sm:bg-white border-2 border-slate-200 border-dashed rounded-2xl sm:rounded-xl shadow-sm">
                <svg class="mx-auto h-12 w-12 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 class="text-base font-bold text-slate-900 tracking-tight">Belum ada data barang</h3>
                <p class="mt-1.5 text-sm text-slate-500 max-w-sm mx-auto">Tidak ada produk yang terdaftar di database
                    saat ini. Silakan masuk ke menu Input Barang untuk menambahkan produk.</p>
            </div>

        </div>

        <div class="py-6 sm:py-0 sm:mt-8 w-full sm:max-w-3xl flex justify-center bg-white sm:bg-transparent">
            <RouterLink to="/"
                class="flex items-center px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors rounded-lg">
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Menu Utama
            </RouterLink>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
                <div class="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
                    <h3 class="font-bold text-lg text-slate-900">Edit Produk</h3>
                    <button @click="showEditModal = false" class="text-slate-400 hover:text-slate-600">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <form @submit.prevent="simpanEdit" class="p-5 space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1">Nama Barang</label>
                        <input v-model="editForm.nama" type="text" required
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1">Harga Jual (Rp)</label>
                        <input v-model="editForm.harga" type="number" required
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1">HPP (Rp)</label>
                        <input v-model="editForm.hpp" type="number" required
                            class="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
                    </div>
                    <div class="pt-2 flex justify-end gap-3">
                        <button type="button" @click="showEditModal = false"
                            class="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">Batal</button>
                        <button type="submit"
                            class="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useProducts } from '../composables/useProduct';

// Import deleteProduct dan updateProductStock dari composable
const { productList, loadProducts, deleteProduct, updateProductStock, updateProductDetails } = useProducts();

const showEditModal = ref(false);
const editForm = ref({ id: '', nama: '', harga: '', hpp: '' });

const bukaEditModal = (item) => {
    editForm.value = {
        id: item.id,
        nama: item.nama,
        harga: item.harga,
        hpp: item.hpp || 0
    };
    showEditModal.value = true;
};

const simpanEdit = async () => {
    await updateProductDetails(editForm.value.id, {
        nama: editForm.value.nama,
        harga: Number(editForm.value.harga),
        hpp: Number(editForm.value.hpp)
    });
    showEditModal.value = false;
};

const tambahStok = async (item) => {
    // 1. Ubah angka di layar seketika (Optimistic Update)
    item.quantity = (item.quantity || 0) + 1;

    // 2. Simpan ke database di latar belakang
    await updateProductStock(item.id, item.quantity);
};

const kurangiStok = async (item) => {
    if ((item.quantity || 0) > 0) {
        // 1. Ubah angka di layar seketika (Optimistic Update)
        item.quantity -= 1;

        // 2. Simpan ke database di latar belakang
        await updateProductStock(item.id, item.quantity);
    }
};

onMounted(async () => {
    await loadProducts();
});

// Fungsi untuk memunculkan peringatan sebelum menghapus
const konfirmasiHapus = async (item) => {
    if (item.quantity > 0) {
        alert(`Gagal! Produk "${item.nama}" masih memiliki stok ${item.quantity}. Kosongkan stok terlebih dahulu agar tidak merusak laporan HPP.`);
        return;
    }

    const yakin = window.confirm(`Apakah Anda yakin ingin menghapus "${item.nama}" dari sistem?`);
    if (yakin) {
        await deleteProduct(item.id);
    }
};
</script>