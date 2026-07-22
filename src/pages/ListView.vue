<template>
    <!-- Latar Belakang Utama: Slate kebiruan (Tanpa Putih) -->
    <div class="min-h-screen bg-slate-200 flex flex-col font-sans selection:bg-emerald-300 selection:text-emerald-900">

        <!-- Bagian Header (Curved Bottom & Decorative Blur) -->
        <div
            class="px-6 pt-8 pb-8 bg-blue-600 rounded-b-[2.5rem] shadow-[0_15px_40px_-15px_rgba(37,99,235,0.6)] flex flex-col items-center relative overflow-hidden border-b border-blue-400/50">
            <!-- Dekorasi Abstrak -->
            <div class="absolute -top-12 -left-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl opacity-70"></div>
            <div class="absolute top-10 -right-12 w-40 h-40 bg-cyan-600 rounded-full blur-3xl opacity-60"></div>

            <!-- Teks Header -->
            <div class="text-center z-10">
                <h2 class="text-3xl font-extrabold text-blue-100 tracking-tight drop-shadow-md">Daftar Inventaris</h2>
                <div
                    class="mt-2 bg-blue-800/40 px-5 py-1.5 rounded-full border border-blue-300/30 backdrop-blur-md inline-block shadow-inner">
                    <p class="text-cyan-100 text-xs font-semibold tracking-wide">
                        Kelola & Pantau Stok Barang
                    </p>
                </div>
            </div>
        </div>

        <!-- Bagian Daftar Produk (Bento Grid Style - Tema Emerald) -->
        <div class="flex-grow px-5 pt-6 pb-12 w-full max-w-xl mx-auto flex flex-col gap-4">

            <!-- Card Item Looping -->
            <div v-for="item in productList" :key="item.id"
                class="relative bg-emerald-200 p-5 rounded-[2rem] shadow-sm border-2 border-emerald-300/40 overflow-hidden flex flex-col gap-4 group transition-all hover:shadow-md hover:border-emerald-400/60">

                <!-- Lingkaran Dekoratif -->
                <div
                    class="absolute -right-8 -top-8 w-32 h-32 bg-emerald-300 rounded-full opacity-40 pointer-events-none group-hover:scale-125 transition-transform duration-500">
                </div>

                <!-- Action Buttons (Absolute Top Right) -->
                <div class="absolute top-4 right-4 flex flex-col gap-2 z-20">
                    <!-- Tombol Edit -->
                    <button @click="bukaEditModal(item)"
                        class="w-9 h-9 bg-blue-300/80 rounded-[1rem] flex items-center justify-center text-blue-900 shadow-sm backdrop-blur-sm hover:bg-blue-400 hover:text-blue-950 hover:scale-105 active:scale-95 transition-all"
                        title="Edit Barang">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                            </path>
                        </svg>
                    </button>
                    <!-- Tombol Hapus -->
                    <button @click="konfirmasiHapus(item)"
                        class="w-9 h-9 bg-rose-300/80 rounded-[1rem] flex items-center justify-center text-rose-900 shadow-sm backdrop-blur-sm hover:bg-rose-400 hover:text-rose-950 hover:scale-105 active:scale-95 transition-all"
                        title="Hapus Barang">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                            </path>
                        </svg>
                    </button>
                </div>

                <!-- Info Produk (Nama & ID) -->
                <div class="relative z-10 pr-14">
                    <h4 class="font-extrabold text-emerald-950 text-lg leading-tight mb-2">{{ item.nama }}</h4>
                    <span
                        class="inline-block px-3 py-1 text-[10px] font-mono font-bold text-emerald-900 uppercase tracking-wider bg-emerald-400/40 rounded-lg shadow-inner border border-emerald-400/30">
                        ID: {{ item.id }}
                    </span>
                </div>

                <!-- Info Harga (Harga Jual & HPP dalam Mini Bento) -->
                <div
                    class="relative z-10 grid grid-cols-2 gap-4 bg-emerald-300/40 p-4 rounded-2xl shadow-inner backdrop-blur-sm border border-emerald-300/50">
                    <div>
                        <span
                            class="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">Harga
                            Jual</span>
                        <span class="font-extrabold text-emerald-950 tracking-tight whitespace-nowrap">Rp {{
                            item.harga.toLocaleString('id-ID') }}</span>
                    </div>
                    <div class="border-l-2 border-dashed border-emerald-400/60 pl-4">
                        <span
                            class="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block mb-0.5">HPP</span>
                        <span class="font-extrabold text-emerald-950 tracking-tight whitespace-nowrap">Rp {{ (item.hpp
                            || 0).toLocaleString('id-ID') }}</span>
                    </div>
                </div>

                <!-- Stok Control -->
                <div class="relative z-10 flex items-center justify-between pt-1">
                    <span class="text-[11px] font-bold text-emerald-900 uppercase tracking-widest">Stok Tersedia</span>

                    <div
                        class="flex items-center gap-1.5 bg-emerald-300/50 p-1.5 rounded-2xl shadow-inner backdrop-blur-sm border border-emerald-300/50">
                        <button @click="kurangiStok(item)"
                            class="w-9 h-9 flex items-center justify-center rounded-[1rem] bg-emerald-100/60 text-emerald-800 hover:bg-rose-300 hover:text-rose-950 transition-colors focus:outline-none disabled:opacity-50 disabled:hover:bg-emerald-100/60 disabled:hover:text-emerald-800 disabled:cursor-not-allowed"
                            :disabled="(item.quantity || 0) <= 0" title="Kurangi Stok">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                            </svg>
                        </button>

                        <span class="font-extrabold text-emerald-950 text-sm min-w-[3rem] text-center">{{ item.quantity
                            || 0 }}</span>

                        <button @click="tambahStok(item)"
                            class="w-9 h-9 flex items-center justify-center rounded-[1rem] bg-emerald-400 text-emerald-950 shadow-sm hover:bg-emerald-500 hover:scale-105 active:scale-95 transition-all focus:outline-none"
                            title="Tambah Stok">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="productList.length === 0"
                class="w-full p-8 text-center bg-emerald-200/50 border-2 border-emerald-400/50 border-dashed rounded-[2rem] shadow-sm flex flex-col items-center justify-center">
                <div
                    class="w-14 h-14 bg-emerald-300/60 rounded-2xl flex items-center justify-center text-emerald-700 mb-4 shadow-inner">
                    <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 class="text-base font-extrabold text-emerald-950 tracking-tight">Belum ada data barang</h3>
                <p class="mt-2 text-[11px] font-bold text-emerald-800 leading-relaxed max-w-[250px]">
                    Tidak ada produk yang terdaftar saat ini. Silakan masuk ke menu Input Barang untuk menambahkan.
                </p>
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

        <!-- Edit Modal (Bento Glassmorphism Style) -->
        <div v-if="showEditModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">

            <div
                class="bg-emerald-200 rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden flex flex-col border-2 border-emerald-300/60 relative">
                <!-- Dekorasi Modal -->
                <div
                    class="absolute -left-10 -top-10 w-32 h-32 bg-emerald-300 rounded-full opacity-40 pointer-events-none">
                </div>

                <!-- Modal Header -->
                <div
                    class="px-6 py-5 border-b-2 border-dashed border-emerald-300/60 flex justify-between items-center relative z-10">
                    <h3 class="font-extrabold text-lg text-emerald-950 tracking-tight">Edit Produk</h3>
                    <button @click="showEditModal = false"
                        class="w-8 h-8 flex items-center justify-center bg-emerald-300/50 rounded-xl text-emerald-800 hover:bg-rose-300 hover:text-rose-950 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Modal Form -->
                <form @submit.prevent="simpanEdit" class="p-6 space-y-4 relative z-10">
                    <div>
                        <label
                            class="block mb-2 text-[11px] font-bold text-emerald-900 uppercase tracking-widest pl-1">Nama
                            Barang</label>
                        <input v-model="editForm.nama" type="text" required
                            class="w-full px-5 py-3.5 text-emerald-950 bg-emerald-300/50 border border-emerald-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-semibold">
                    </div>
                    <div>
                        <label
                            class="block mb-2 text-[11px] font-bold text-emerald-900 uppercase tracking-widest pl-1">Harga
                            Jual</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none"><span
                                    class="text-emerald-800/70 font-bold text-sm">Rp</span></div>
                            <input v-model="editForm.harga" type="number" required
                                class="w-full pl-14 pr-5 py-3.5 text-emerald-950 bg-emerald-300/50 border border-emerald-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-semibold">
                        </div>
                    </div>
                    <div>
                        <label
                            class="block mb-2 text-[11px] font-bold text-emerald-900 uppercase tracking-widest pl-1">HPP</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none"><span
                                    class="text-emerald-800/70 font-bold text-sm">Rp</span></div>
                            <input v-model="editForm.hpp" type="number" required
                                class="w-full pl-14 pr-5 py-3.5 text-emerald-950 bg-emerald-300/50 border border-emerald-400/40 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all font-semibold">
                        </div>
                    </div>

                    <div class="pt-2 flex justify-end gap-3">
                        <button type="button" @click="showEditModal = false"
                            class="px-5 py-3 text-sm font-bold text-emerald-900 bg-emerald-300/60 rounded-2xl hover:bg-emerald-300 transition-colors shadow-sm">
                            Batal
                        </button>
                        <button type="submit"
                            class="px-5 py-3 text-sm font-bold text-emerald-50 bg-emerald-600 rounded-2xl hover:bg-emerald-700 active:scale-95 transition-all shadow-md">
                            Simpan Data
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useProducts } from '../composables/useProduct';
import { useToast } from '../composables/useToast';

// Import deleteProduct dan updateProductStock dari composable
const { productList, loadProducts, deleteProduct, ubahStokAman, updateProductDetails } = useProducts();
const { showToast } = useToast();

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
    await ubahStokAman(item.id, 1);
};

const kurangiStok = async (item) => {
    if ((item.quantity || 0) > 0) {
        await ubahStokAman(item.id, -1);
    }
};

onMounted(async () => {
    await loadProducts();
});

// Fungsi untuk memunculkan peringatan sebelum menghapus
const konfirmasiHapus = async (item) => {
    if (item.quantity > 0) {
        showToast(`Gagal! Produk "${item.nama}" masih memiliki stok ${item.quantity}. Kosongkan stok terlebih dahulu agar tidak merusak laporan HPP.`, 'error');
        return;
    }

    const yakin = window.confirm(`Apakah Anda yakin ingin menghapus "${item.nama}" dari sistem?`);
    if (yakin) {
        await deleteProduct(item.id);
    }
};
</script>